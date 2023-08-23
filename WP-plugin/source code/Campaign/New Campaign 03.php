<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
    <title>Page-03</title>
    <link rel="stylesheet" href="../css/style-cam.css">
</head>
<body style="padding : 5%;">
    
    
    <form action="">
        <div class="row">
            <div class="col-md-2">
                <img src="img01.png" alt="" align = "right" style=" margin-top: 45px;">
            </div>
            <div class="col-md-8" style="height: auto;">
                <label>Kristal @ GiveKindness.asia</label>
                <label class="label_style">Share your story with us</label>
                <label>please share the beneficiary's story and why you're fundraising for the beneficiary. The more you share the better! We will have more information to write a compelling campaign story for you.</label>
                <input type="text" id="inp_01" class="inp_1" style="display: none;">
                <div class="row" style="max-height:500px;scroll-behavior: auto; border: 1px solid gray; border-radius: 10px;padding: 30px 5px 5px 15px;">
                    
                    <input type="file" id="image-input" accept="image/jpeg, image/png, image/jpg" style="display: none;">
                    <div  align="center" style="display: flex;">
                        <div id="H1" onclick="H1()" class="col-sm-2" style="padding: 0 5px 0 5px;">
                            <i  style="font-size:24px" class="fa">&#xf1dc;</i>
                            <br><p>Header Text</p>
                        </div>
                        <div class="col-sm-2" style="padding: 0 5px 0 5px;">
                            <i id="quote" style="font-size:24px" class="fa">&#xf10d;</i>
                            <br><p>Quote</p>
                        </div>
                        <div id="Body" onclick="Body()" class="col-sm-2" style="padding: 0 5px 0 5px;">
                            <i id="bold"style="font-size:24px" class="fa">&#xf032;</i>
                            <br><p>Body Text</p>
                        </div>
                        <label for="image-input" class="col-sm-2" style="padding: 0 5px 0 5px;margin:0px;">
                            <i id="image" style="font-size:24px" class="fa">&#xf1c5;</i>
                            <br><p>Image</p>
                        </label>
                        <div class="col-sm-2" style="padding: 0 5px 0 5px;">
                            <i id="video" style="font-size:24px" class="fa">&#xf144;</i>
                            <br><p>Video</p>
                        </div>
                    </div>   
                    <input type="text" id="inp_02" class="inp_2" style="display: none;height: auto;overflow: scroll;">
                    
                    <div id="display-image" style="background-repeat: no-repeat;"></div>
                    <script>
                        function H1(){
                            var n=document.getElementById('inp_01');
                            
                            if (n.style.display != 'none') 
                            {
                                n.style.display = 'none';
                            }
                            else
                            {
                                n.style.display = '';
                            }
                        }
                        function Body(){
                            var m=document.getElementById('inp_02');
                            if (m.style.display != 'none') 
                            {
                                m.style.display = 'none';
                            }
                            else
                            {
                                m.style.display = '';
                            }
                        }
                        const image_input = document.querySelector("#image-input");
                        image_input.addEventListener("change", function() {
                        const reader = new FileReader();
                        reader.addEventListener("load", () => {
                            const uploaded_image = reader.result;
                            document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
                        });
                        reader.readAsDataURL(this.files[0]);
                        });
                    </script>
                </div>
            </div>
        </div>
    </form>
</body>
</html>