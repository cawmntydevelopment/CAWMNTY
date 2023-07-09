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
            <?php include_once(V_PATH."element/home_feature.php");?>
            <?php include_once(V_PATH."element/hot.php");?>
            <?php include_once(V_PATH."element/footer.php");?>
        </div>
    </div>

    
    

    <?php include_once(V_PATH."element/end.php");?>
    
    <script>

        const hot = document.getElementById("home-all-nft");

        const onload = () => {
            getTodoItems()
        }

        const getTodoItems = async () => {
            
            const response = await axios.get(
                "<?=API_URL?>" + "/all",
            )

            const data = response?.data?.data;

            if(data) {

                console.log(data)
                for(let i = 0; i < data.length; i++) {

                    if(data[i].name !== "firefoxtest") {

                    const abbr = data[i]?.owner.substr(0,5) + "..." + data[i].owner.substr((data[i]?.owner.length - 5),data[i].owner.length)

                    hot.innerHTML += `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d cyber">
                            <div class="sc-product style2">
                                <div class="top" style="margin-bottom:5px">
                                    <a href="<?=WEB_URL?>/asset/${data[i].tokenId}" class="tag">@${data[i].name}</a>
                                
                                </div>
                                <div class="bottom">
                                    <div class="details-product">
                                        <div class="author">
                                            <div class="content">
                                                <div class="position">Creator</div>
                                                <div class="name"> <a href="#">${abbr}</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="features">
                                    <div class="product-media">
                                    <a href="<?=WEB_URL?>/asset/${data[i].tokenId}">
                                        <img src="${data[i].image.replaceAll("ipfs://", "https://ipfs.io/ipfs/")}" alt="images">
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    }

                }
               
            }



        };

    </script>
    
</body>
</html>