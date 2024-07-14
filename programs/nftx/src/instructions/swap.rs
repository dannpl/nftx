use crate::errors::CustomError;
use crate::Collection;
use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token_interface::{
    transfer_checked, Mint, Token2022, TokenAccount, TransferChecked,
};

#[derive(Accounts)]
pub struct Swap<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(mut)]
    pub collection: Box<Account<'info, Collection>>,

    #[account(mut)]
    pub nft_mint: Box<InterfaceAccount<'info, Mint>>,

    #[account(
        mut,
        constraint = nft_from_ata.amount >= 1,
    )]
    pub nft_from_ata: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(
       init_if_needed,
       payer = signer,
       associated_token::mint = nft_mint,
       associated_token::authority = signer,
    )]
    pub nft_to_ata: Box<InterfaceAccount<'info, TokenAccount>>,

    #[account(mut)]
    /// CHECK: just to check if the treasury is the same as the collection
    pub treasury_account: AccountInfo<'info>,

    pub token_program: Program<'info, Token2022>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

pub fn swap(ctx: Context<Swap>) -> Result<()> {
    let cpi_program = ctx.accounts.token_program.to_account_info();

    // Transfer the specified amount of tokens from the user to the collection treasury
    let transfer_result = transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.signer.to_account_info(),
                to: ctx.accounts.treasury_account.to_account_info(),
            },
        ),
        ctx.accounts.collection.price,
    );

    if transfer_result.is_err() {
        return Err(CustomError::SwapFailed.into());
    }

    // Transfer one random NFT from the collection to the user
    let cpi_nft_accounts = TransferChecked {
        from: ctx.accounts.nft_from_ata.to_account_info(),
        mint: ctx.accounts.nft_mint.to_account_info(),
        to: ctx.accounts.nft_to_ata.to_account_info(),
        authority: ctx.accounts.collection.to_account_info(),
    };

    let signer: &[&[&[u8]]] = &[&[
        Collection::PREFIX_SEED,
        ctx.accounts.collection.name.as_bytes(),
        &[ctx.accounts.collection.bump],
    ]];

    transfer_checked(
        CpiContext::new_with_signer(cpi_program.clone(), cpi_nft_accounts, signer),
        1,
        0,
    )?;

    Ok(())
}
