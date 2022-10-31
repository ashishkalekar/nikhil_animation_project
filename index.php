<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "conn.php";
error_reporting(E_ERROR | E_PARSE);
if (isset($_POST['submit'])) {

  $extraURLs_col = array();
  $col_from_db = array();
  $col_toCreate_new = array();

  foreach ($_POST["extraURLs"] as $key => $value) {
    array_push($extraURLs_col, $key);
  }
  // get list of available columns from database
  if ($get_db_col = mysqli_query($conn, "SHOW COLUMNS FROM animation")) {
    while ($db_col = mysqli_fetch_assoc($get_db_col)) {
      array_push($col_from_db, $db_col["Field"]);
    }
  }

  // add new column in database
  for ($i = 0; $i < count($extraURLs_col); $i++) {
    if (!in_array($extraURLs_col[$i], $col_from_db)) {
      if (mysqli_query($conn, "ALTER TABLE animation ADD $extraURLs_col[$i] VARCHAR(255)")) {
        array_push($col_toCreate_new, $extraURLs_col[$i]);
      }
    }
  }
  // final data to add in database
  $postFields = array();
  foreach ($_POST as $key => $value) {
    if (is_array($_POST[$key])) {
      foreach ($_POST[$key] as $key1 => $value1) {
        $postFields[str_replace("_in","",$key1)] = "'" . $value1 . "'";
      }
    } else {
      $postFields[str_replace("_in","",$key)] = "'" . $value . "'";
    }
  }
  if (isset($postFields["submit"])) {
    unset($postFields["submit"]);
  }
  $keys = array_keys($postFields);
  $values = array_values($postFields);

  // insert data in database
  $sql = "INSERT INTO animation (" . implode(',', $keys) . ") VALUES (" . implode(',', $values) . ")";
  $result = mysqli_query($conn, $sql);
  if ($result) {
    echo "Inserted Successfully<br>";
  } else {
    echo mysqli_error($conn);
  }

  // $result = mysqli_query($conn, $sql);
  // if ($result) {
  //   // header("location:./success.php/");
  //   //********************************************************************************************************* */
  //   // $ex_arr = explode(',', $allURL);
  //   // print_r ($ex_arr);

  //   foreach ($ex_arr as $value) {
  //     // $value;
  //     $ex_arr1 = explode(':', $value);
  //     $count = count($ex_arr1);
  //     $result = mysqli_query($conn, "SHOW COLUMNS FROM animation LIKE '$ex_arr1[0]'");
  //     $exists = (mysqli_num_rows($result)) ? TRUE : FALSE;
  //     if ($exists) {
  //     } else {
  //       $result = mysqli_query($conn, "ALTER TABLE animation ADD $ex_arr1[0] VARCHAR(255)");
  //       if ($result) {

  //         $sql = "INSERT INTO `animation`(`$ex_arr1[0]`)values('$ex_arr1[1])')";
  //         $result = mysqli_query($conn, $sql);
  //         if ($result) {
  //           echo "insert was success";
  //           // $last_id = mysqli_insert_id($conn);
  //           // echo ($last_id);
  //         } else {
  //           echo "error";
  //         }
  //       } else {
  //         echo "error";
  //       }

  //       //  echo "not exist";

  //     }
  //   }



  //********************************************************************************************************* */
}


//           print_r( $ex_arr1[0]);
// echo '<br>' ;       
//           print_r( $ex_arr1[1]);
// echo '<br>' ;       


// }


// function checkCol(){
// $sql='SELECT client FROM animation';
// $result = mysqli_query($conn,"SHOW COLUMNS FROM animation LIKE 'client'");
// $exists = (mysqli_num_rows($result))?TRUE:FALSE;
// if($exists) {
//    echo "exit";
// }
// }
// checkCol();






// ALTER TABLE animation;
// ADD  datatype;

?>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <!------------------------------------------------------------- PAGE1 Starts ------------------------------------------------------------------->
  <form autocomplete="off" action="<?= htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST" novalidate>
    <div id="page1" class="tabcontent" style="display: block">
      <table class="t_page1">
        <tr>
          <td colspan="2" class="select_dims">Select dimension : </td>
        </tr>
        <tr>
          <td class="wh_dims"><strong>Client</strong></td>
          <td><input id="client_in" name="client_in" type="text" /></td>
        </tr>
        <tr>
          <td class="wh_dims"><strong>Campaign</strong></td>
          <td><input id="campaign_in" name="campaign_in" type="text" /></td>
        </tr>
        <tr>
          <td class="wh_dims"><strong>Fcat</strong></td>
          <td><input id="fcat_in" name="fcat_in" type="text" /></td>
        </tr>
        <tr>
          <td class="wh_dims"><strong>Width<strong></td>
          <td><input id="width_in" name="width_in" type="number" /></td>
        </tr>
        <tr>
          <td class="wh_dims"><strong>Height<strong></td>
          <td><input id="height_in" name="height_in" type="number" /></td>
        </tr>
        <tr>
          <td colspan="2">
            <!-- <button type="button"
                class="tablinks page1_button"
                onclick="page(event, 'page2')"
              >
                Next
              </button> -->
          </td>
        </tr>
      </table>

      <!--------------------------------------------------------- Add URL's here ---------------------------------------------------------->


      <div class="form-group">
        <h2>Ad creation/data upload :</h2>
        <div class="just">
          <label for="usr" class="url_in" data-title="bg">bg url:</label>
          <input name="extraURLs[bg]" type="url" class="url-input" id="0" placeholder="Add URL here" />
        </div>
        <br />
      </div>

      <div class="addFieldForm">
        <input id="addFieldInput" placeholder="Add Title here">
        <button type="button" class="add">ADD</button>
        <button type="button" class="cancel">CANCEL</button>
      </div>

      <input type="text" class="allURL" hidden name="allURL" style="width: 100%;">



      <div class="btn-div">
        <button type="button" class="ad_field" id="button" type="button">+ Add field</button>
        <!-- <button type="button" class="tablinks page2_button" onclick="page(event, 'page1')">
          previous
        </button> -->
        <button type="button" id="ads_preview" class="page2_button" type="button">
          Preview
        </button>
        <button type="button" class="tablinks page2_button" onclick="page(event, 'page2')">
          Next
        </button>
      </div>
    </div>
    <!--------------------------------------------------------- PAGE2 Starts ---------------------------------------------------------->

    <div id="page2" class="tabcontent">

      <div>
        <h2 class="last">Select Your Animations</h2>
        <h3 class="page3_heading">Asset</h3>
        <h3 class="page3_heading">Select animations</h3>
        <h3 class="page3_heading">Delay(sec)</h3>
        <h3 class="page3_heading">Animation delay(sec)</h3>
        <h3 class="page3_heading">Animation repeat count</h3>
        <div class="anima" id="animation">
          <input type="number" id="repeat_delay" placeholder="repeat delay" class="rclass" />
          <input type="number" id="repeat" placeholder="no. of repeats" class="rnumber" />
        </div>
        <textarea style="display: none" name="generatedCode" rows="9" cols="22" id="function" placeholder="Your function will come here"></textarea>
        <div class="clickable">
          <button type="button" class="tablinks page3_button" onclick="page(event, 'page1')">
            Back
          </button>
          <button type="button" id="preview" class="page3_button">Preview</button>
          <button type="button" class="b_copy page3_button" onclick="copy()">
            <b>Copy Code</b>
          </button>
        </div>
      </div>

      <!------------------------------------------------------ PAGE2 Ends -------------------------------------------->

      <br>
      <br>
      <br>
      <input value="Save Data" type="submit" name="submit" class="save-data">

    </div>
  </form>

  <div id="images" class="img_outer"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"></script>
  <script src="index.js"></script>
</body>

</html>