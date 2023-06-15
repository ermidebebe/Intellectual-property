// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PatentNFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => uint256) public tokenIdToPatentId;
    mapping(uint256 => uint256) public patentIdToTokenId;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("Patent NFT", "PNFT") {}

    /// can the mint function be called by anyone ??
    // where is the token uri ??
    function mint(address _to, uint256 _patentId , string calldata tokenURIString)  external {
        require(
            patentIdToTokenId[_patentId] == 0,
            "Patent already minted as NFT"
        );

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        tokenIdToPatentId[tokenId] = _patentId;
        patentIdToTokenId[_patentId] = tokenId;
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, tokenURIString);
    }

    function _burn(
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function exists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }
}
