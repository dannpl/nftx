use crate::state::{Collection, InitializeCollectionArgs};
use anchor_lang::prelude::*;
use anchor_lang::solana_program::account_info::AccountInfo;

#[derive(Accounts)]
#[instruction(args: InitializeCollectionArgs)]
pub struct InitializeCollection<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(init, payer = signer, space = Collection::SPACE, seeds = [Collection::PREFIX_SEED, args.name.as_bytes()], bump)]
    pub collection: Box<Account<'info, Collection>>,

    pub system_program: Program<'info, System>,
}

pub fn initialize_collection(
    ctx: Context<InitializeCollection>,
    args: InitializeCollectionArgs,
) -> Result<()> {
    let collection = &mut ctx.accounts.collection;

    collection.init_ts = Clock::get()?.unix_timestamp;
    collection.name = args.name;
    collection.authority = *ctx.accounts.signer.key;
    collection.supply = args.supply;
    collection.symbol = args.symbol;
    collection.minteds = 0;
    collection.price = args.price;
    collection.bump = ctx.bumps.collection;
    collection.tresuary_account = args.tresuary_account;

    Ok(())
}
