use crate::{errors::CustomError, Collection, InitializeVaultArgs, Vault};
use anchor_lang::prelude::*;
use anchor_spl::token::Token;

#[derive(Accounts)]
#[instruction(args: InitializeVaultArgs)]
pub struct InitializeVault<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(mut)]
    pub collection: Account<'info, Collection>,

    #[account(init, payer = signer, space = Vault::SPACE, seeds = [Vault::PREFIX_SEED, args.name.as_bytes()], bump)]
    pub vault: Box<Account<'info, Vault>>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

pub fn initialize_vault(ctx: Context<InitializeVault>, args: InitializeVaultArgs) -> Result<()> {
    if ctx.accounts.signer.key.to_string() != ctx.accounts.collection.authority.to_string() {
        return Err(CustomError::Unauthorized.into());
    }

    let vault = &mut ctx.accounts.vault;

    vault.bump = ctx.bumps.vault;
    vault.authority = *ctx.accounts.signer.key;
    vault.init_ts = Clock::get()?.unix_timestamp;
    vault.name = args.name;
    vault.amount_users = 0;
    vault.collection = args.collection;

    Ok(())
}
