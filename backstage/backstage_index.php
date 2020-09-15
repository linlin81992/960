<?php
try {
  require_once("./connectMySql.php");
  // 抓管理員資料
  $AD_PASSWORD = $_POST["AD_PASSWORD"];
  $AD_ACCOUNT = $_POST["AD_ACCOUNT"];
  $ADSql = "select * from `administrator` where AD_ACCOUNT='$AD_ACCOUNT' and AD_PASSWORD='$AD_PASSWORD' ";
  $AD = $pdo->query($ADSql);
  //-------------------------------------------------
  $memSql = "select * from member";
  $adminSql = "select * from administrator";
  $quizSql = "select q.QUIZ_NO, q.QUIZ_CON, q.QUIZ_PIC_ONE, q.QUIZ_SEL_ONE_CONTENT ,c.ind_class 'firstType', q.QUIZ_PIC_TWO,q.QUIZ_SEL_TWO_CONTENT, d.ind_class 'secondType', q.QUIZ_USE from quiz q join industry_class c on q.QUIZ_SEL_ONE_CLASS=c.IND_NO join industry_class d on q.QUIZ_SEL_two_CLASS=d.IND_NO order by QUIZ_NO;";
  $careerSql = "select i.IND_INT_NO,i.IND_INT_NAME,i.IND_INT_PICTURE ,c.IND_CLASS,i.IND_INT_SKILL, s.IND_SAL_STEP_DISTANCE,s.IND_SAL_LOW,s.IND_SAL_HIGH from industry_introduce i
join industry_class c on i.IND_NO = c.IND_NO join industry_salary s on i.IND_INT_NO = s.IND_INT_NO order by i.IND_INT_NO;";

  $skillSql = "select a.*, b.IND_CLASS from SKILL_CLASS a join INDUSTRY_CLASS b on a.IND_NO = b.IND_NO order by SKI_NO";
  $ArReportSql = "select a.ART_REP_NO, a.DIS_NO, b.DIS_NAME, b.DIS_CONTENT, c.MEM_EMAIL, a.ART_REP_CONTENT, a.ART_REP_PASS from ARTICLE_REPORT a join DISCUSS_AREA b on a.DIS_NO = b.DIS_NO join MEMBER c on a.MEM_NO = c.MEM_NO";
  $MgReportSql = "select a.MES_REP_NO, a.DIS_MES_NO, c.DIS_MES_CONTENT, b.MEM_EMAIL, a.MES_REP_CONTENT, a.MES_REP_PASS from MESSAGE_REPORT a join MEMBER b on a.MEM_NO = b.MEM_NO join DISCUSS_MESSAGE c on a.DIS_MES_NO = c.DIS_MES_NO";
  $orderDetailSql = "select a.*, b.*, c.SKI_NAME from ORDER_MEM a join ORDER_DETIAL b on a.ORD_NO = b.ORD_NO JOIN SKILL_CLASS c on b.SKI_NO = c.SKI_NO";
  $orderSql = "select * from ORDER_MEM";
  $materialSql = "select * from POSTCARD_MATERIAL ";
  $announceSql = "select * from announcement;";
  // $indusSql = "select ";
  $member = $pdo->query($memSql);
  $administrator = $pdo->query($adminSql);
  $quiz = $pdo->query($quizSql);
  $career = $pdo->query($careerSql);
  $salary = $pdo->query($salarySql);
  $skill = $pdo->query($skillSql);
  $ArReport = $pdo->query($ArReportSql);
  $MgReport = $pdo->query($MgReportSql);
  $orderDetail = $pdo->query($orderDetailSql);
  $order = $pdo->query($orderSql);
  $material = $pdo->query($materialSql);
  $announce = $pdo->query($announceSql);
} catch (PDOException $e) {
  echo "錯誤原因:", $e->getMessage(), "<br>";
  echo "錯誤行號:", $e->getLine(), "<br>";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>職引960後台</title>
  <link rel="stylesheet" href="./bootstrap/bootstrap-grid.min.css">
  <link rel="stylesheet" href="./css/app_public.css">
  <link rel="stylesheet" href="./css/backstage_index.css">

</head>

<body>
  <header>

    <div class="logo">
      <a href="./backstage_index.php">
        <img src="./img/LOGO_FINAL.svg" alt="logo">
      </a>
    </div>
    <div class="bg_ad2">
      <div>
        <p class="ad_name">
          <?php
          if ($AD->rowCount() == 0) {
            //如果筆數是0 就是沒有這個帳密
            echo "帳密錯誤";
          } else {
            $ADRow = $AD->fetch(PDO::FETCH_ASSOC);
            echo $ADRow["AD_NAME"];
          }
          ?>
        </p>
        <p>
          <a href="./backstage_login.html">登出</a>
        </p>
      </div>

    </div>

  </header>
  <div class="container backstage" id="bg_stage">
    <div class="row">
      <div class="side col-2">
        <div class="list">
          <ul class="member_management">
            <li class="title">人員管理</li>
            <li v-for="(member,index) in members" @click="show(index)">{{member}}</li>
          </ul>
          <ul class="management">
            <li class="title">前後台管理</li>
            <li v-for="(list,index) in lists" @click="showBoard(index)">{{list}}</li>
          </ul>
        </div>
        <div class="copyright">
          <a href="./index.html">職引960</a>
          <span>
            &copy;2020.
          </span>
        </div>
      </div>

      <div class="main col-11">
        <!-- <component :is="member"></component> -->
        <div class="account" v-show="account">
          會員
          <form>
            <input type="text">
            <button>查詢</button>
          </form>
          <table>
            <tr>
              <th>編號</th>
              <th>名稱</th>
              <th>生日</th>
              <th>電話</th>
              <th>電子郵件</th>
              <th>是否停權</th>
            </tr>
            <?php
            while ($memberRow = $member->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>

                <td><?= $memberRow["MEM_NO"] ?></td>
                <td><?= $memberRow["MEM_NAME"] ?></td>
                <td><?= $memberRow["MEM_BIR"] ?></td>
                <td><?= $memberRow["MEM_TEL"] ?></td>
                <td><?= $memberRow["MEM_EMAIL"] ?></td>
                <td>
                  <p class="memUse"> <?php echo $memberRow["MEM_USE"] == 0 ? "否" : "是" ?></p>

                  <select name="authority" id="MEM_USE">
                    <option value="authority" <?php echo $memberRow["MEM_USE"] == 1 ? "selected" : "" ?>>是</option>
                    <option value="authority" <?php echo $memberRow["MEM_USE"] == 0 ? "selected" : "" ?>>否</option>
                  </select>
                  <button class="edit">編輯</button>
                </td>
              </tr>
            <?php
            }
            ?>
          </table>
        </div>

        <div class="administrator" v-show="administrator">管理員
          <table>
            <tr>
              <th>編號</th>
              <th>名稱</th>
              <th>帳號</th>
              <th>停權</th>
            </tr>
            <?php
            while ($adminRow = $administrator->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td><?= $adminRow["AD_NO"] ?></td>
                <td><?= $adminRow["AD_NAME"] ?></td>
                <td><?= $adminRow["AD_ACCOUNT"] ?></td>
                <td>
                  <p><?php echo $adminRow["AD_MAT_USE"] == 1 ? "否" : "是" ?></p>

                  <select name="authority" id="">
                    <option value="authority">是</option>
                    <option value="authority">否</option>
                  </select>
                  <button class="edit">編輯</button>
                </td>
              </tr>
            <?php
            }
            ?>
          </table>
          <table id="myForm" style="display: none;">
            <tr class="title">
              <th>編號</th>
              <th>名稱</th>
              <th>帳號</th>
              <th>密碼</th>
            </tr>
            <tr class="new_administrator" style="display:none">
              <td>2</td>
              <td>
                <input type="text">
              </td>
              <td>
                <input type="text">
              </td>
              <td>
                <input type="text">
              </td>
              <td>
                <button>確認</button>
              </td>
            </tr>
          </table>
          <div id="adForm">
            <button id="newAdBtn">新增管理員</button>
          </div>
        </div>
        <div class="quiz" v-show="quiz">
          測驗題庫
          <table>
            <tr>
              <th>編號</th>
              <th>問題內容</th>
              <th>選項一圖片</th>
              <th>選項一內容</th>
              <th>選項一類別</th>
              <th>選項二圖片</th>
              <th>選項二內容</th>
              <th>選項二類別</th>
              <th>啟用題目</th>
              <th>修改</th>
            </tr>
            <?php
            while ($quizRow = $quiz->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td><?= $quizRow["QUIZ_NO"] ?></td>
                <td><?= $quizRow["QUIZ_CON"] ?></td>
                <td>
                  <img src="<?= $quizRow['QUIZ_PIC_ONE'] ?>" alt="photo1">
                  <input type="file" name="" id="">
                </td>
                <td><?= $quizRow["QUIZ_SEL_ONE_CONTENT"] ?></td>
                <td>
                  <p> <?= $quizRow["firstType"] ?></p>

                  <select name="" id="">
                    <option value="R" <?php echo $quizRow["firstType"] == "實作型" ? "selected" : "" ?>>實作型</option>
                    <option value="I" <?php echo $quizRow["firstType"] == "研究型" ? "selected" : "" ?>>研究型</option>
                    <option value="A" <?php echo $quizRow["firstType"] == "文藝型" ? "selected" : "" ?>>文藝型</option>
                    <option value="S" <?php echo $quizRow["firstType"] == "社會型" ? "selected" : "" ?>>社會型</option>
                    <option value="E" <?php echo $quizRow["firstType"] == "企業型" ? "selected" : "" ?>>企業型</option>
                    <option value="C" <?php echo $quizRow["firstType"] == "事務型" ? "selected" : "" ?>>事務型</option>
                  </select>
                </td>
                <td>
                  <img src="<?= $quizRow['QUIZ_PIC_TWO'] ?>" alt="photo2">
                  <input type="file" name="" id="">
                </td>
                <td><?= $quizRow["QUIZ_SEL_TWO_CONTENT"] ?></td>
                <td>
                  <p><?= $quizRow["secondType"] ?></p>
                  <select name="" id="">
                    <option value="" v-for="type in types" <?php echo $quizRow["secondType"] == "{{type}}" ? "selected" : "" ?>>{{type}}</option>
                  </select>
                </td>
                <td>
                  <p><?php echo $quizRow["QUIZ_USE"] == 0 ? "否" : "是" ?></p>
                  <select name="authority" id="">
                    <option value="authority">是</option>
                    <option value="authority">否</option>
                  </select>
                </td>
                <td>
                  <button class="edit">編輯</button>
                </td>
              </tr>
            <?php
            }
            ?>
          </table>
          <button>新增題目</button>
        </div>
        <div class="industry" v-show="industry">
          行業管理
          <table>
            <tr>
              <th>編號</th>
              <th>名字</th>
              <th>介紹</th>
              <th>圖片</th>
              <th>類別</th>
              <th>內容</th>
              <th>技能</th>
              <th>一年以下</th>
              <th>一~三年</th>
              <th>三~五年</th>
              <th>五~十年</th>
              <th>十年以上</th>
              <th>修改</th>
            </tr>
            <?php
            while ($careerRow = $career->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td><?= $careerRow["IND_INT_NO"] ?></td>
                <td><?= $careerRow["IND_INT_NAME"] ?></td>
                <td>這是簡短介紹</td>
                <td>
                  <img src="" alt="行業圖片">
                </td>
                <td>
                  文藝型
                  <select name="" id="">
                    <option value="" v-for="type in types">{{type}}</option>
                  </select>
                </td>
                <td>這是內容</td>
                <td>
                  <ul>
                    <li>技能1</li>
                    <li>技能2</li>
                    <li>技能3</li>
                    <li>技能4</li>
                    <li>技能5</li>
                    <li>技能6</li>
                  </ul>
                </td>
                <td>
                  <?php
                  while ($salaryRow = $salary->fetch(PDO::FETCH_ASSOC)) {
                  ?>
                    <p>最低月薪:
                      <span><?= $salaryRow["IND_SAL_LOW"] ?></span>
                    </p>
                    <p>最高月薪:
                      <span>20000</span>
                    </p>
                  <?php
                  }
                  ?>
                </td>
                <td>
                  <p>最低月薪:
                    <span>20000</span>
                  </p>
                  <p>最高月薪:
                    <span>20000</span>
                  </p>
                </td>
                <td>
                  <p>最低月薪:
                    <span>20000</span>
                  </p>
                  <p>最高月薪:
                    <span>20000</span>
                  </p>
                </td>
                <td>
                  <p>最低月薪:
                    <span>20000</span>
                  </p>
                  <p>最高月薪:
                    <span>20000</span>
                  </p>
                </td>
                <td>
                  <p>最低月薪:
                    <span>20000</span>
                  </p>
                  <p>最高月薪:
                    <span>20000</span>
                  </p>
                </td>
                <td>

                  <button class="edit">編輯</button>
                </td>
              </tr>
            <?php
            }
            ?>
          </table>
          <button>新增行業</button>
        </div>
        <div class="skill_class" v-show="skill_class">
          課程
          <table>
            <tr>
              <th>編號</th>
              <th>名稱</th>
              <th>類別</th>
              <th>購買人數</th>
              <th>價格</th>
              <th>總時數</th>
              <th>介紹</th>
              <th>課程連結</th>
              <th>課程圖片</th>
              <th>講師圖片</th>
              <th>講師名稱</th>
              <th>講師介紹</th>
              <th>大綱</th>
              <th>上課對象</th>
              <th>是否隱藏</th>
              <th>修改</th>
            </tr>
            <?php
            while ($skillRow = $skill->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td><?= $skillRow["SKI_NO"] ?></td>
                <td><?= $skillRow["SKI_NAME"] ?></td>
                <td>
                  <?= $skillRow["IND_CLASS"] ?>
                  <select name="" id="">
                    <option value="" v-for="type in types">{{type}}</option>
                  </select>
                </td>
                <td><?= $skillRow["SKI_BUY_NUM"] ?></td>
                <td><?= $skillRow["SKI_PRICE"] ?></td>
                <td><?= $skillRow["SKI_TIME"] ?></td>
                <td><?= $skillRow["SKI_INTRO"] ?></td>
                <td><?= $skillRow["SKI_LINK"] ?></td>
                <td>
                  <img src="<?= $skillRow["SKI_IMG"] ?>" alt="課程圖片">
                </td>
                <td>
                  <img src="<?= $skillRow["SKI_TEC_IMG"] ?>" alt="講師圖片">
                </td>
                <td><?= $skillRow["SKI_TEC_NAME"] ?></td>
                <td><?= $skillRow["SKI_TEC_INTRO"] ?></td>
                <td>
                  <ul>
                    <li><?= $skillRow["SKI_OUTLINE"] ?></li>
                  </ul>
                </td>
                <td><?= $skillRow["SKI_STUD"] ?></td>
                <td>
                  <?= $skillRow["SKI_HIDDEN"] ?>
                  <select name="authority" id="">
                    <option value="authority">是</option>
                    <option value="authority">否</option>
                  </select>
                </td>
                <td>
                  <button class="edit">編輯</button>
                </td>
              </tr>
            <?php
            }
            ?>
          </table>
          <button>新增課程</button>
        </div>
        <div class="article_report" v-show="article_report">
          主題檢舉
          <table>
            <tr>
              <th>檢舉編號</th>
              <th>主題編號</th>
              <th>主題名稱</th>
              <th>檢舉內容</th>
              <th>檢舉者</th>
              <th>檢舉原因</th>
              <th>審核</th>
            </tr>
            <?php
            while ($ArReportRow = $ArReport->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td><?= $ArReportRow["ART_REP_NO"] ?></td>
                <td><?= $ArReportRow["DIS_NO"] ?></td>
                <td><?= $ArReportRow["DIS_NAME"] ?></td>
                <td><?= $ArReportRow["DIS_CONTENT"] ?></td>
                <td><?= $ArReportRow["MEM_EMAIL"] ?></td>
                <td><?= $ArReportRow["ART_REP_CONTENT"] ?></td>
                <td><?= $ArReportRow["ART_REP_PASS"] ?>
                  <select name="" id="">
                    <option value="">通過</option>
                    <option value="">未通過</option>

                  </select>
                </td>
              </tr>
            <?php
            }
            ?>
          </table>
        </div>
        <div class="message_report" v-show="message_report">
          留言檢舉
          <table>
            <tr>
              <th>檢舉編號</th>
              <th>留言編號</th>
              <th>檢舉內容</th>
              <th>檢舉者</th>
              <th>檢舉原因</th>
              <th>審核</th>
            </tr>
            <?php
            while ($MgReportRow = $MgReport->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td><?= $MgReportRow["MES_REP_NO"] ?></td>
                <td><?= $MgReportRow["DIS_MES_NO"] ?></td>
                <td><?= $MgReportRow["DIS_MES_CONTENT"] ?></td>
                <td><?= $MgReportRow["MEM_EMAIL"] ?></td>
                <td><?= $MgReportRow["MES_REP_CONTENT"] ?></td>
                <td><?= $MgReportRow["MES_REP_PASS"] ?>
                  <select name="" id="">
                    <option value="">通過</option>
                    <option value="">未通過</option>

                  </select>
                </td>
              <?php
            }
              ?>
              </tr>
          </table>
        </div>
        <div class="order_mem" v-show="order_mem">
          訂單
          <table>
            <tr>
              <th>編號</th>
              <th>會員編號</th>
              <th>總金額</th>
              <th>付款方式</th>
              <th>購買日期</th>
              <th></th>
            </tr>
            <?php
            while ($orderRow = $order->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td><?= $orderRow["ORD_NO"] ?></td>
                <td><?= $orderRow["MEM_NO"] ?></td>
                <td><?= $orderRow["ORD_AMOUNT"] ?></td>
                <td><?= $orderRow["ORD_PAY"] ?></td>
                <td><?= $orderRow["ORD_DATE"] ?></td>
                <td><button>訂單明細</button></td>
              </tr>
            <?php
            }
            ?>

            <tr>
              <th>訂單明細編號</th>
              <th>課程編號</th>
              <th>課程名稱</th>
              <th>價格</th>
            </tr>
            <?php
            while ($orderDetailRow = $orderDetail->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td><?= $orderDetailRow["ORD_DET_NO"] ?></td>
                <td><?= $orderDetailRow["SKI_NO"] ?></td>
                <td><?= $orderDetailRow["SKI_NAME"] ?></td>
                <td><?= $orderDetailRow["ORD_DET_PRICE"] ?></td>

              </tr>
            <?php
            }
            ?>
          </table>
        </div>
        <div class="postcard_material" v-show="postcard_material">
          明信片素材
          <table>

            <tr>
              <th>素材編號</th>
              <th>素材名稱</th>
              <th>素材圖片</th>
              <th>啟用</th>
            </tr>
            <?php
            while ($materialRow = $material->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td><?= $materialRow["POS_MAT_NO"] ?></td>
                <td><?= $materialRow["POS_MAT_NAME"] ?></td>
                <td>
                  <img src="<?= $materialRow["POS_MAT_PIC"] ?>" alt="<?= $materialRow["POS_MAT_NAME"] ?>">
                </td>
                <td><?= $materialRow["POS_MAT_USE"] ?>
                  <select name="" id="">
                    <option value="">是</option>
                    <option value="">否</option>
                  </select>
                </td>
              </tr>
            <?php
            }
            ?>
          </table>
          <button>新增素材</button>
        </div>
        <div class="announcement" v-show="announcement">
          公告
          <table>

            <tr>
              <th>編號</th>
              <th>內容</th>
              <th>日期</th>
              <th>發布</th>
            </tr>
            <?php
            while ($announceRow = $announce->fetch(PDO::FETCH_ASSOC)) {
            ?>
              <tr>
                <td><?= $announceRow["ANN_NO"] ?></td>
                <td><?= $announceRow["ANN_CONTENT"] ?></td>
                <td><?= $announceRow["ANN_DATE"] ?></td>

                <td><?= $announceRow["ANN_USE"] ?>
                  <select name="" id="">
                    <option value="">是</option>
                    <option value="">否</option>
                  </select>
                </td>
              </tr>
            <?php
            }
            ?>
          </table>
          <button>新增公告</button>
        </div>
      </div>
    </div>
  </div>

  <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
  <script src="./js/backstage_component.js"></script>
  <script src="./js/backstage_index.js"></script>

</body>

</html>