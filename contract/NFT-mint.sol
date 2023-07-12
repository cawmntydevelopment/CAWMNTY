// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract UsernameNFT is ERC721, Ownable {
    struct NFTMetadata {
        uint256 tokenId;
        string username;
        uint256 salePrice;
        string metadataURI;
    }

    mapping(string => address) private usernameToOwner;
    mapping(uint256 => string) private tokenIdToUsername;
    mapping(string => NFTMetadata) private nftMetadata;
    address public constant cwnTokenAddress = ;
    IERC20 public cwnToken;
    uint256 public baseMintCost;
    uint256 private nextTokenId;

    constructor() ERC721("CAW", "tCAW") {
        cwnToken = IERC20(cwnTokenAddress);
        baseMintCost = 0.005 ether;
        nextTokenId = 1;
    }
    event NFTCreated(uint256 indexed tokenId, address indexed owner, string username, uint256 salePrice);

    function setMintCost(string memory username, uint256 mintCost) external onlyOwner {
        require(usernameToOwner[username] != address(0), "Username does not exist");
        require(mintCost > 0, "Mint cost must be greater than zero");
        nftMetadata[username].salePrice = mintCost;
    }


    function createNFT(string memory username, string memory metadataURI, uint256 mintCost) external {
    require(usernameToOwner[username] == address(0), "Username already used");
    require(mintCost > 0, "Mint cost must be greater than zero");
    require(usernameToOwner[username] == address(0), "Username already used");

    usernameToOwner[username] = msg.sender;
    tokenIdToUsername[nextTokenId] = username;

    NFTMetadata storage metadata = nftMetadata[username];
    metadata.salePrice = mintCost;
    metadata.metadataURI = metadataURI;

    _safeMint(msg.sender, nextTokenId);
    emit NFTCreated(nextTokenId, msg.sender, username, mintCost);
    nextTokenId++;
    cwnToken.approve(msg.sender, mintCost);
    cwnToken.transferFrom(msg.sender, address(this), mintCost);
}

function checkUsernameAvailability(string memory username) external view returns (bool) {
    return usernameToOwner[username] == address(0);
}

    function sellNFT(uint256 tokenId, uint256 salePrice) external {
        require(_exists(tokenId), "Token ID does not exist");
        require(ownerOf(tokenId) == msg.sender, "Only the owner can sell the NFT");
        require(salePrice > 0, "Sale price must be greater than zero");

        nftMetadata[tokenIdToUsername[tokenId]].salePrice = salePrice;
    }

    function buyNFT(uint256 tokenId) external {
        require(_exists(tokenId), "Token ID does not exist");
        require(nftMetadata[tokenIdToUsername[tokenId]].salePrice > 0, "NFT not for sale");

        address seller = ownerOf(tokenId);
        uint256 salePrice = nftMetadata[tokenIdToUsername[tokenId]].salePrice;

        cwnToken.transferFrom(msg.sender, seller, salePrice);
        _transfer(seller, msg.sender, tokenId);
        nftMetadata[tokenIdToUsername[tokenId]].salePrice = 0;
    }

    function getAllNFTs() external view returns (NFTMetadata[] memory) {
        NFTMetadata[] memory allMetadata = new NFTMetadata[](nextTokenId - 1);
        
        for (uint256 i = 1; i < nextTokenId; i++) {
            string memory username = tokenIdToUsername[i];
            NFTMetadata memory metadata = nftMetadata[username];
            
            metadata.tokenId = i;
            metadata.username = username;
            
            allMetadata[i - 1] = metadata;
        }
        
        return allMetadata;
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token ID does not exist");
        string memory username = tokenIdToUsername[tokenId];
        return nftMetadata[username].metadataURI;
    }

    function getUsername(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token ID does not exist");
        return tokenIdToUsername[tokenId];
    }

    function getMintCost(string memory username) external view returns (uint256) {
        require(usernameToOwner[username] != address(0), "Username does not exist");
        return nftMetadata[username].salePrice;
    }

    function getSalePrice(string memory username) external view returns (uint256) {
        require(usernameToOwner[username] != address(0), "Username does not exist");
        return nftMetadata[username].salePrice;
    }

    function getProfileImageURI(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "Token ID does not exist");
        string memory username = tokenIdToUsername[tokenId];
        return nftMetadata[username].metadataURI;
    }

}
