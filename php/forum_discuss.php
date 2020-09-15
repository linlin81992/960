<?php
try {
    require_once "connectMySql.php";
    $sql = "select  MEMBER.MEM_NAME,
                    MEMBER.MEM_PIC,
                    INDUSTRY_CLASS.IND_CLASS,
                    INDUSTRY_CLASS.IND_COLOR,
                    DISCUSS_AREA.DIS_NAME,
                    DISCUSS_AREA.DIS_CLASS,
                    DISCUSS_AREA.DIS_CONTENT,
                    DISCUSS_AREA.DIS_DATE,
                    DISCUSS_AREA.DIS_COL_NUM,
                    DISCUSS_AREA.DIS_LIK_NUM,
                    DISCUSS_AREA.DIS_NO
    from member join discuss_area using(MEM_NO)
                join industry_class using(IND_NO);";
    // $sql = "select * from discuss_area";
    $dis = $pdo->query($sql);

    if ($dis->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $disRow = $dis->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($disRow);

    }
} catch (PDOException $e) {
    echo $e->getMessage();
}