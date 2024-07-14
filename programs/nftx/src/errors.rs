use anchor_lang::prelude::*;

#[error_code]
pub enum CustomError {
    #[msg("Failed to mint NFT")]
    MintFailed,

    #[msg("Failed to swap NFT")]
    TransferFeeInitFailed,

    #[msg("Failed unuathorized action")]
    Unauthorized,

    #[msg("Failed to create vault")]
    VaultCreateFailed,

    #[msg("Failed stake NFT")]
    StakeFailed,

    #[msg("Failed unstake NFT")]
    UnstakeFailed,

    #[msg("Supply has reached the maximum limit")]
    SupplyReached,
}
