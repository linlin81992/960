<?php
try {
    require_once "connectMySql.php";
    $sql = "insert into article_like (DIS_NO,MEM_NO)
    value (:DIS_NO,:MEM_NO)";

    $dis = $pdo->prepare($sql);
    $dis->bindValue(":DIS_NO", $_POST['DIS_NO']);
    $dis->bindValue(":MEM_NO", $_POST['MEM_NO']);
    $dis->execute();

    if ($dis->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到

        $disRow = $dis->fetchAll(PDO::FETCH_ASSOC);
        // $result = select DIS_NO from ARTICLE_LIKE;

        //送出json字串
        echo json_encode($disRow);

    }


} catch (PDOException $e) {
    echo $e->getMessage();
}