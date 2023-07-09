<?php
    $id = $_sekme1;

    $url = API_URL."/nft?id=".$id;

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once(V_PATH."element/head.php");?>
    <title><?=WEB_NAME?> | <?=WEB_SLOGAN?></title>
</head>

<style>
    .cards-nft-caw {
        height : auto !important
    }
</style>

<body onload="onload()" class="body header-fixed home-5">
    <!-- preloade -->
    <div class="preload preload-container">
        <div class="preload-logo"></div>
    </div>
    <!-- /preload -->

    <div id="wrapper" class="wrapper-style">
        <div id="page" class="clearfix">
            <?php include_once(V_PATH."element/header.php");?>
            <section class="tf-item-detail">
                <div class="tf-container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="tf-item-detail-inner style-2">
                                <div class="image">
                                    <img style="width:600px" id="nft-image" alt="Image">
                                </div>
                                <div class="content">
                                    <div class="content-top">
                                        <div class="author">
                                            <h6 class="title" id="wallet">Trending Arts</h6>
                                        </div>
                                        <div class="wishlish">
                                            <div class="option btn-option"><i class="far fa-ellipsis-h"></i>
                                                <div class="option_popup">
                                                    <a target="_blank" id="etherscan">Etherscan</a>
                                                    <a target="_blank" id="opensea">Opensea</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h2 class="title-detail" id="title-detail"></h2>
                                    <p class="except " id="except">A Collection Of 10,000 Undead NFTs Minted On The Ethereum Blockchain. Each Unique Deadfella Is Randomly Generated From A Combination.</p>
                                
                                    <div class="tf-tab">
                                        <ul class="menu-tab ">
                                            <li class="tab-title active">
                                                <a href="#">Details</a>
                                            </li>
                                        </ul>
                                        <div class="content-tab">
                                            <div class="content-inner active" >
                                                <div class="tab-details">
                                                    <div class="top">
                                                        <div class="author">
                                                            <div class="heading">Current Owner</div>
                                                            <div class="infor">
                                                                <h6 class="name" id="wall-1">Surrogatess</h6>
                                                            </div>
                                                        </div>
                                                        <div class="author">
                                                            <div class="heading">Creator</div>
                                                            <div class="infor">
                                                                <h6 class="name" id="wall-2">Truman Wallaker</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="title-propepties">Properties</div>
                                                    <ul class="properties">
                                                        <li><a href="#"><svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 11.375L1.09375 7.53125L0 8.375L6 13.0312L12 8.375L10.9062 7.53125L6 11.375ZM6 9.65625L10.9062 5.84375L12 5L6 0.34375L0 5L1.09375 5.84375L6 9.65625ZM6 2.03125L9.8125 5L6 7.96875L2.1875 5L6 2.03125Z" fill="white"/>
                                                            </svg> <span id="length"> </span></a></li>
                                                        <li><a href="#"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.34375 3.65625H7.65625V5H6.34375V3.65625ZM6.34375 6.34375H7.65625V10.3438H6.34375V6.34375ZM7 0.34375C3.3125 0.34375 0.34375 3.3125 0.34375 7C0.34375 10.6875 3.3125 13.6562 7 13.6562C10.6875 13.6562 13.6562 10.6875 13.6562 7C13.6562 3.3125 10.6875 0.34375 7 0.34375ZM7 12.3438C4.0625 12.3438 1.65625 9.9375 1.65625 7C1.65625 4.0625 4.0625 1.65625 7 1.65625C9.9375 1.65625 12.3438 4.0625 12.3438 7C12.3438 9.9375 9.9375 12.3438 7 12.3438Z" fill="white"/>
                                                            </svg>2400 x 2278 px (1.72MB)</a></li>
                                                        <li><a href="#"><svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5 5C6.28125 5 7.34375 3.96875 7.34375 2.65625C7.34375 1.375 6.28125 0.34375 5 0.34375C3.71875 0.34375 2.65625 1.375 2.65625 2.65625C2.65625 3.96875 3.71875 5 5 5ZM5 1.65625C5.5625 1.65625 6 2.125 6 2.65625C6 3.21875 5.5625 3.65625 5 3.65625C4.4375 3.65625 4 3.21875 4 2.65625C4 2.125 4.4375 1.65625 5 1.65625ZM5.03125 8.34375H2.1875C2.84375 8 3.96875 7.65625 5 7.65625C5.0625 7.65625 5.15625 7.6875 5.21875 7.6875C5.46875 7.1875 5.84375 6.78125 6.3125 6.46875C5.84375 6.375 5.375 6.34375 5 6.34375C3.4375 6.34375 0.34375 7.125 0.34375 8.65625V9.65625H5V8.65625C5 8.5625 5 8.4375 5.03125 8.34375ZM10 6.65625C8.78125 6.65625 6.34375 7.34375 6.34375 8.65625V9.65625H13.6562V8.65625C13.6562 7.34375 11.2188 6.65625 10 6.65625ZM10.8125 5.46875C11.3125 5.15625 11.6562 4.625 11.6562 4C11.6562 3.09375 10.9062 2.34375 10 2.34375C9.09375 2.34375 8.34375 3.09375 8.34375 4C8.34375 4.625 8.6875 5.15625 9.1875 5.46875C9.4375 5.59375 9.71875 5.65625 10 5.65625C10.2812 5.65625 10.5625 5.59375 10.8125 5.46875Z" fill="white"/>
                                                            </svg>
                                                            Head: v1</a></li>
                                                        <li><a href="#"><svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1.65625 13.6562V8.65625H0.65625V5C0.65625 4.28125 1.28125 3.65625 2 3.65625H4C4.71875 3.65625 5.34375 4.28125 5.34375 5V8.65625H4.34375V13.6562H1.65625ZM10 13.6562V9.65625H12L10.3125 4.59375C10.125 4.03125 9.625 3.65625 9.03125 3.65625H8.96875C8.375 3.65625 7.875 4.03125 7.6875 4.59375L6 9.65625H8V13.6562H10ZM3 3C3.75 3 4.34375 2.40625 4.34375 1.65625C4.34375 0.9375 3.75 0.34375 3 0.34375C2.25 0.34375 1.65625 0.9375 1.65625 1.65625C1.65625 2.40625 2.25 3 3 3ZM9 3C9.75 3 10.3438 2.40625 10.3438 1.65625C10.3438 0.9375 9.75 0.34375 9 0.34375C8.25 0.34375 7.65625 0.9375 7.65625 1.65625C7.65625 2.40625 8.25 3 9 3Z" fill="white"/>
                                                            </svg>
                                                            Body: Gradient</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        
                                        </div>                           
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        
            <?php include_once(V_PATH."element/footer.php");?>
        </div>
    </div>

    <?php include_once(V_PATH."element/end.php");?>
    <script>

    async function onload() {
            const response = await axios.get("<?=API_URL?>" + "/nft?id="+ "<?=$_sekme1?>")
            const data = response?.data?.data;
            
            console.log(data)
            if(data !== "error") {
                const abbr = data.owner.substr(0,5) + "..." + data.owner.substr((data.owner.length - 5),data.owner.length)

                document.getElementById("nft-image").src = data.image.replaceAll("ipfs://", "https://ipfs.io/ipfs/");
                document.getElementById("title-detail").innerHTML = "@" +data.name + " #" + data.tokenId;
                document.getElementById("except").innerHTML = data.description;
                document.getElementById("length").innerHTML = "Length : " +data.name.length;
                document.getElementById("wall-1").innerHTML = abbr;
                document.getElementById("wall-2").innerHTML = abbr;
                document.getElementById("wallet").innerHTML = "";
                document.getElementById("etherscan").href = "https://sepolia.etherscan.io/nft/0x6224cb514ef4c449a5fd45031ea7dfda2531b44f/" + data.tokenId
                document.getElementById("opensea").href = "https://testnets.opensea.io/assets/sepolia/0x6224cb514ef4c449a5fd45031ea7dfda2531b44f/" + data.tokenId
                
                
            } else if(data === "error") {
                location.href = "<?=WEB_URL?>"
            } else {
                location.href = "<?=WEB_URL?>"
            }

    }

    </script>
    
</body>
</html>