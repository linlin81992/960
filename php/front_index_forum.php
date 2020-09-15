<?php
try {
    require_once "connectMySql.php";
    $forumSql = "select a.*, b.mes_num from DISCUSS_AREA a join (SELECT dis_no, count(*) mes_num FROM DISCUSS_MESSAGE group by DIS_NO) b on a.DIS_NO = b.DIS_NO group by DIS_NO ";
    $forum = $pdo->query($forumSql);

    if ($forum->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $forumRow = $forum->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($forumRow);

    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
?>