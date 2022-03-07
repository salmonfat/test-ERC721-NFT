pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract testERC721NFT is ERC721,Ownable{
    using Strings for uint256;
    uint maxSupply;
    uint price;
    address artise;
    uint NFTIdCount;
    string _NFTfolderURI;
    constructor()ERC721("testNFT","TN"){
        maxSupply=6;
        price=(0.1 ether);
        artise=msg.sender;
        NFTIdCount=1;
        _NFTfolderURI="https://gateway.pinata.cloud/ipfs/QmeLxaoqMEfG8qAxMfzLq5utRAWvMY2dQDJscFZLSfF4re/";
    }
    function _baseURI() internal view override returns (string memory) {
        return _NFTfolderURI;
    }
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI,"buty",tokenId.toString(),".json")) : "";
    }
    function mintNFT()public payable{
        require(msg.value==price,"the price is 0.1 ETH");
        require(NFTIdCount<=maxSupply);
        _safeMint(msg.sender,NFTIdCount);
        NFTIdCount++;
    }
    function withdraw()external onlyOwner{
        payable(artise).transfer(address(this).balance);
    }
    function contractURI() public view returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/QmZwdxCAoMdo9dREi5hZQebRSTvDpY7fuxWUNAZoYqgVJh";
    }
}
