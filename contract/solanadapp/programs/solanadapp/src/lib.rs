use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, TokenAccount, Token};

declare_id!("EVY3ciLz1hnQizj4YVtAWBjrG7sUfAH6yJemiHgyhLw6");

#[program]
pub mod solanadapp {
    use super::*;

    pub fn initialize_profile(ctx: Context<InitializeProfile>, user_name: String) -> Result<()> {
        let profile = &mut ctx.accounts.profile;
        profile.user = *ctx.accounts.user.key;
        profile.user_name = user_name;
        profile.friend_count = 0;
        profile.friends = vec![];
        Ok(())
    }

    pub fn add_friend(ctx: Context<AddFriend>, friend: Pubkey) -> Result<()> {
        let profile = &mut ctx.accounts.profile;
        profile.friends.push(friend);
        profile.friend_count += 1;
        Ok(())
    }

    pub fn mint_nft(ctx: Context<MintNFT>) -> Result<()> {
        let profile = &ctx.accounts.profile;

        if profile.friend_count < 5 {
            return Err(ErrorCode::NotEnoughFriends.into());
        }

        let cpi_accounts = MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::mint_to(cpi_ctx, 1)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeProfile<'info> {
    #[account(init, payer = user, space = 8 + 32 + 4 + 32 + 4 + (32 * 10))]
    pub profile: Account<'info, Profile>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddFriend<'info> {
    #[account(mut, has_one = user)]
    pub profile: Account<'info, Profile>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct MintNFT<'info> {
    #[account(mut, has_one = user)]
    pub profile: Account<'info, Profile>,
    pub user: Signer<'info>,
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Profile {
    pub user: Pubkey,
    pub user_name: String,
    pub friend_count: u32,
    pub friends: Vec<Pubkey>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Not enough friends to mint NFT")]
    NotEnoughFriends,
}
