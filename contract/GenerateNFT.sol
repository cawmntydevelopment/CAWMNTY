// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract UsernameSVG is Ownable {
    string public description = "Username SVGs with embedded usernames";

    function generate(string memory username) public view returns (string memory) {
        string memory svg = string(abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">',
            '<defs>',
            '<style>.cls-1{isolation:isolate;fill:url(#Adsiz_degrade_10);}.cls-2{font-size:88.34px;font-family:Verdana-Bold, Verdana;font-weight:700;}.cls-3{fill:none;}.cls-4{fill-rule:evenodd;}</style>',
            '<linearGradient id="Adsiz_degrade_10" x1="-1.65" y1="93.95" x2="833.37" y2="773.56" gradientUnits="userSpaceOnUse">',
            '<stop offset="0" stop-color="#ffee38"/>',
            '<stop offset="1" stop-color="#ec9001"/>',
            '</linearGradient>',
            '</defs>',
            '<rect class="cls-1" width="1024" height="1024" rx="42.8"/>',
            '<text class="cls-2" style="text-anchor:middle;" x="512" y="512">',
            username,
            '</text>',
            '<rect class="cls-3" width="1024" height="1024" rx="42.8"/>',
            '<path d="M512,780.76c-134.12,0-243.22,109.12-243.23,243.24H304.5c0-114.41,93.08-207.5,207.49-207.5S719.49,909.59,719.5,1024h35.73C755.22,889.88,646.11,780.76,512,780.76Z"/>',
            '<path d="M673.34,963l-41.68,61h-60.6c3.54-24.53,23.45-46,28.91-52.84l0,0h0Z"/>',
            '<path d="M453,1024H392.32l-41.67-60.73,73.34,8h0C429.45,978.13,449.39,999.47,453,1024Z"/>',
            '<path d="M487.48,859.27c15.9-3.44,32.55-3.19,49.79,0l-10.91,43.61,24.87,16,92.4-7.19L600,971.15c-10.22,1.52-48.36,10.53-72.3-8.07L512,999.2h0l-15.73-36.1c-23.91,18.64-62.06,9.7-72.28,8.19l-43.72-59.46,92.41,7.06,24.85-16-11-43.59c17.24-3.17,33.89-3.45,49.79,0Z"/>',
            '<g id="_966384" data-name="966384">',
            '<path class="cls-4" d="M501.48,602.75l-13.81-13.81-4.6,4.6L501.48,612l39.45-39.46-4.6-4.6Z"/>',
            '</g>',
            '</svg>'
        ));

        string memory json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "', username, '", "description": "', description, '", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '"}'
        ))));

        return string(abi.encodePacked('data:application/json;base64,', json));
    }

    function setDescription(string memory _description) public onlyOwner {
        description = _description;
    }
}
