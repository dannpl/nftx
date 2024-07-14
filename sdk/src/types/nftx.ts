/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/nftx.json`.
 */
export type Nftx = {
  address: 'BGQFcsJJopkMEXHP3hLcad4dpKRbPUvh5utMA4932HxF'
  metadata: {
    name: 'nftx'
    version: '0.1.0'
    spec: '0.1.0'
  }
  instructions: [
    {
      name: 'initializeCollection'
      discriminator: [112, 62, 53, 139, 173, 152, 98, 93]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'collection'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 108, 108, 101, 99, 116, 105, 111, 110]
              },
              {
                kind: 'arg'
                path: 'args.name'
              }
            ]
          }
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'args'
          type: {
            defined: {
              name: 'initializeCollectionArgs'
            }
          }
        }
      ]
    },
    {
      name: 'initializeVault'
      discriminator: [48, 191, 163, 44, 71, 129, 63, 164]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'collection'
          writable: true
        },
        {
          name: 'vault'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [118, 97, 117, 108, 116]
              },
              {
                kind: 'arg'
                path: 'args.name'
              }
            ]
          }
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        }
      ]
      args: [
        {
          name: 'args'
          type: {
            defined: {
              name: 'initializeVaultArgs'
            }
          }
        }
      ]
    },
    {
      name: 'mintNft'
      discriminator: [211, 57, 6, 167, 15, 219, 35, 251]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'collection'
          writable: true
        },
        {
          name: 'mint'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 105, 110, 116]
              },
              {
                kind: 'arg'
                path: 'args.name'
              }
            ]
          }
        },
        {
          name: 'payerAta'
          writable: true
        },
        {
          name: 'treasuryAccount'
          writable: true
        },
        {
          name: 'rent'
          address: 'SysvarRent111111111111111111111111111111111'
        },
        {
          name: 'tokenProgram'
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'args'
          type: {
            defined: {
              name: 'mintNftArgs'
            }
          }
        }
      ]
    },
    {
      name: 'stakeNft'
      discriminator: [38, 27, 66, 46, 69, 65, 151, 219]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'vault'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [118, 97, 117, 108, 116]
              },
              {
                kind: 'arg'
                path: 'args.vault'
              }
            ]
          }
        },
        {
          name: 'stake'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [115, 116, 97, 107, 101]
              },
              {
                kind: 'arg'
                path: 'args.nft_name'
              }
            ]
          }
        },
        {
          name: 'mint'
          writable: true
        },
        {
          name: 'fromAta'
          writable: true
        },
        {
          name: 'toAta'
          writable: true
        },
        {
          name: 'tokenProgram'
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'args'
          type: {
            defined: {
              name: 'stakeNftArgs'
            }
          }
        }
      ]
    },
    {
      name: 'swap'
      discriminator: [248, 198, 158, 145, 225, 117, 135, 200]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'collection'
          writable: true
        },
        {
          name: 'nftMint'
          writable: true
        },
        {
          name: 'nftFromAta'
          writable: true
        },
        {
          name: 'nftToAta'
          writable: true
        },
        {
          name: 'treasuryAccount'
          writable: true
        },
        {
          name: 'tokenProgram'
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: []
    },
    {
      name: 'unstakeNft'
      discriminator: [17, 182, 24, 211, 101, 138, 50, 163]
      accounts: [
        {
          name: 'signer'
          writable: true
          signer: true
        },
        {
          name: 'collection'
          writable: true
        },
        {
          name: 'stakeVault'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [118, 97, 117, 108, 116]
              },
              {
                kind: 'arg'
                path: 'args.vault'
              }
            ]
          }
        },
        {
          name: 'stake'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [115, 116, 97, 107, 101]
              },
              {
                kind: 'arg'
                path: 'args.nft_name'
              }
            ]
          }
        },
        {
          name: 'refund'
          writable: true
        },
        {
          name: 'mint'
          writable: true
        },
        {
          name: 'fromAta'
          writable: true
        },
        {
          name: 'toAta'
          writable: true
        },
        {
          name: 'tokenProgram'
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'args'
          type: {
            defined: {
              name: 'unstakeNftArgs'
            }
          }
        }
      ]
    }
  ]
  accounts: [
    {
      name: 'collection'
      discriminator: [48, 160, 232, 205, 191, 207, 26, 141]
    },
    {
      name: 'stake'
      discriminator: [150, 197, 176, 29, 55, 132, 112, 149]
    },
    {
      name: 'vault'
      discriminator: [211, 8, 232, 43, 2, 152, 117, 119]
    }
  ]
  errors: [
    {
      code: 6000
      name: 'mintFailed'
      msg: 'Failed to mint NFT'
    },
    {
      code: 6001
      name: 'transferFeeInitFailed'
      msg: 'Failed to swap NFT'
    },
    {
      code: 6002
      name: 'unauthorized'
      msg: 'Failed unuathorized action'
    },
    {
      code: 6003
      name: 'vaultCreateFailed'
      msg: 'Failed to create vault'
    },
    {
      code: 6004
      name: 'stakeFailed'
      msg: 'Failed stake NFT'
    },
    {
      code: 6005
      name: 'unstakeFailed'
      msg: 'Failed unstake NFT'
    },
    {
      code: 6006
      name: 'supplyReached'
      msg: 'Supply has reached the maximum limit'
    },
    {
      code: 6007
      name: 'swapFailed'
      msg: 'Failed to swap SOL to NFT'
    }
  ]
  types: [
    {
      name: 'collection'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'initTs'
            type: 'i64'
          },
          {
            name: 'name'
            type: 'string'
          },
          {
            name: 'authority'
            type: 'pubkey'
          },
          {
            name: 'symbol'
            type: 'string'
          },
          {
            name: 'supply'
            type: 'u32'
          },
          {
            name: 'minteds'
            type: 'u32'
          },
          {
            name: 'price'
            type: 'u64'
          },
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'tresuaryAccount'
            type: 'pubkey'
          }
        ]
      }
    },
    {
      name: 'initializeCollectionArgs'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'name'
            type: 'string'
          },
          {
            name: 'supply'
            type: 'u32'
          },
          {
            name: 'symbol'
            type: 'string'
          },
          {
            name: 'tresuaryAccount'
            type: 'pubkey'
          },
          {
            name: 'price'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'initializeVaultArgs'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'name'
            type: 'string'
          }
        ]
      }
    },
    {
      name: 'mintNftArgs'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'name'
            type: 'string'
          },
          {
            name: 'uri'
            type: 'string'
          }
        ]
      }
    },
    {
      name: 'stake'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'authority'
            type: 'pubkey'
          },
          {
            name: 'initTs'
            type: 'i64'
          },
          {
            name: 'nftName'
            type: 'string'
          },
          {
            name: 'mint'
            type: 'pubkey'
          },
          {
            name: 'vault'
            type: 'pubkey'
          },
          {
            name: 'points'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'stakeNftArgs'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'nftName'
            type: 'string'
          },
          {
            name: 'vault'
            type: 'string'
          }
        ]
      }
    },
    {
      name: 'unstakeNftArgs'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'vault'
            type: 'string'
          },
          {
            name: 'nftName'
            type: 'string'
          }
        ]
      }
    },
    {
      name: 'vault'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'authority'
            type: 'pubkey'
          },
          {
            name: 'initTs'
            type: 'i64'
          },
          {
            name: 'amountUsers'
            type: 'u64'
          },
          {
            name: 'name'
            type: 'string'
          },
          {
            name: 'collection'
            type: 'pubkey'
          }
        ]
      }
    }
  ]
}
