use crate::errors::CustomError;
use crate::Collection;
use crate::{state::Stake, UnstakeNFTArgs, Vault};
use anchor_lang::prelude::*;
use anchor_spl::token_2022::Token2022;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{transfer_checked, Mint, TokenAccount, TransferChecked},
};

#[derive(Accounts)]
#[instruction(args: UnstakeNFTArgs)]
pub struct UnstakeNFT<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(mut)]
    pub collection: Account<'info, Collection>,

    #[account(mut, seeds = [Vault::PREFIX_SEED, args.vault.as_bytes()], bump)]
    pub stake_vault: Box<Account<'info, Vault>>,

    #[account(mut, close = refund, seeds = [Stake::PREFIX_SEED, args.nft_name.as_ref()], bump)]
    pub stake: Box<Account<'info, Stake>>,

    /// CHECK: verified if the refund pubkey is equal the treasury pubkey
    #[account(mut)]
    pub refund: AccountInfo<'info>,

    #[account(mut)]
    pub mint: Box<InterfaceAccount<'info, Mint>>,

    #[account(mut)]
    pub from_ata: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(
        init_if_needed,
        payer = signer,
        associated_token::mint = mint,
        associated_token::authority = signer,
        constraint = signer.key() == to_ata.owner && to_ata.mint == mint.key()
    )]
    pub to_ata: Box<InterfaceAccount<'info, TokenAccount>>,

    pub token_program: Program<'info, Token2022>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

pub fn unstake_nft(ctx: Context<UnstakeNFT>, _args: UnstakeNFTArgs) -> Result<()> {
    if ctx.accounts.stake.authority != *ctx.accounts.signer.key
        || ctx.accounts.refund.key.to_string()
            != ctx.accounts.collection.tresuary_account.to_string()
    {
        return Err(CustomError::Unauthorized.into());
    }

    let mint = &ctx.accounts.mint.to_account_info();
    let stake = &mut ctx.accounts.stake;
    let stake_vault = &mut ctx.accounts.stake_vault;

    if stake.mint != *mint.key {
        return Err(CustomError::Unauthorized.into());
    }

    stake_vault.amount_users -= 1;

    let signer: &[&[&[u8]]] = &[&[
        Vault::PREFIX_SEED,
        ctx.accounts.stake_vault.name.as_bytes(),
        &[ctx.accounts.stake_vault.bump],
    ]];

    let cpi_accounts = TransferChecked {
        from: ctx.accounts.from_ata.to_account_info().clone(),
        mint: ctx.accounts.mint.to_account_info().clone(),
        to: ctx.accounts.to_ata.to_account_info().clone(),
        authority: ctx.accounts.stake_vault.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_context = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);

    transfer_checked(cpi_context, 1, ctx.accounts.mint.decimals)?;

    Ok(())
}
