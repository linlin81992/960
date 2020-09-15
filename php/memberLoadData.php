<?php
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){

            $sql = "select MEM_NO, MEM_NAME, MEM_CODE, MEM_PIC, MEM_TEL, MEM_EMAIL from `member` where MEM_NO = :memNo";
            $sqlAnalysis = "select i.IND_CLASS, i.IND_INFO, q.QUIZ_RES_TYPE_R, q.QUIZ_RES_TYPE_I, q.QUIZ_RES_TYPE_A, q.QUIZ_RES_TYPE_S, q.QUIZ_RES_TYPE_E, q.QUIZ_RES_TYPE_C, q.QUIZ_RES_DATE from `quiz_result_analysis` q join `industry_class` i on q.QUIZ_RES_FIT_TYPE = i.IND_NO where q.MEM_NO = :memNo";
            $sqlClassBuy = "select mem.MEM_NAME, skill.SKI_NAME, skill.SKI_IMG, skill.SKI_TEC_NAME from `order_detial` item join `order_mem` ord on item.ORD_NO = ord.ORD_NO join `member` mem on ord.MEM_NO = mem.MEM_NO join `skill_class` skill on item.SKI_NO = skill.SKI_NO where ord.MEM_NO = :memNo";
            $sqlClassCollection = "select mem.MEM_NO, skicol.SKI_NO, skill.SKI_NAME, skill.SKI_IMG, skill.SKI_TEC_NAME  from `skill_collect` skicol join `member` mem on skicol.MEM_NO = mem.MEM_NO join `skill_class` skill on skicol.SKI_NO = skill.SKI_NO where skicol.MEM_NO = :memNo";
            $sqlArticle = "select mem.MEM_NO, artcol.DIS_NO, dis.DIS_NAME, dis.DIS_NO  from `article_collect` artcol join `member` mem on artcol.MEM_NO = mem.MEM_NO join `discuss_area` dis on artcol.DIS_NO = dis.DIS_NO where dis.DIS_HIDDEN = 1 and artcol.MEM_NO = :memNo";
            $sqlPostCard = "select mem.MEM_NO, pos.POS_PIC, pos.POS_PIC_BACK, pos.POS_CRE_DATE, pos.POS_SEN_DATE  from `postcard` pos join `member` mem on pos.MEM_NO = mem.MEM_NO where pos.MEM_NO = :memNo";
            $sqlOrder = "select mem.MEM_NO, ord.ORD_NO, ord.ORD_DATE, ord.ORD_AMOUNT, ski.SKI_NAME, ski.SKI_IMG, ski.SKI_TEC_NAME, ski.SKI_NO from `order_mem` ord join `member` mem on ord.MEM_NO = mem.MEM_NO join `order_detial` orddet on ord.ORD_NO = orddet.ORD_NO join `skill_class` ski on ski.SKI_NO = orddet.SKI_NO where ord.MEM_NO = :memNo order by ord.ORD_NO asc";
            $sqlOrderCount = "select orddet.ORD_NO, count(orddet.SKI_NO) '商品數量' from `order_mem` ord join `order_detial` orddet on ord.ORD_NO = orddet.ORD_NO where ord.MEM_NO = :memNo group by orddet.ORD_NO";
            $memberDataAll = $pdo -> prepare($sql);
            $memberDataAll -> bindValue(":memNo",$_POST["memNo"]);
            $memberDataAll -> execute();
            $memberAnalysis = $pdo -> prepare($sqlAnalysis);
            $memberAnalysis -> bindValue(":memNo",$_POST["memNo"]);
            $memberAnalysis -> execute();
            $memberClassBuy = $pdo -> prepare($sqlClassBuy);
            $memberClassBuy -> bindValue(":memNo",$_POST["memNo"]);
            $memberClassBuy -> execute();
            $memberClassCollection = $pdo -> prepare($sqlClassCollection);
            $memberClassCollection -> bindValue(":memNo",$_POST["memNo"]);
            $memberClassCollection -> execute();
            $memberArticle = $pdo -> prepare($sqlArticle);
            $memberArticle -> bindValue(":memNo",$_POST["memNo"]);
            $memberArticle -> execute();
            $memberPostCard = $pdo -> prepare($sqlPostCard);
            $memberPostCard -> bindValue(":memNo",$_POST["memNo"]);
            $memberPostCard -> execute();
            $memberOrder = $pdo -> prepare($sqlOrder);
            $memberOrder -> bindValue(":memNo",$_POST["memNo"]);
            $memberOrder -> execute();
            $memberOrderCount = $pdo -> prepare($sqlOrderCount);
            $memberOrderCount -> bindValue(":memNo",$_POST["memNo"]);
            $memberOrderCount -> execute();
            
            if($memberDataAll -> rowCount() == 0){
                echo "沒資料";
            }
            else{
                $memberDataAll_row=$memberDataAll->fetchAll(PDO::FETCH_ASSOC);
                $memberAnalysis_row=$memberAnalysis->fetchAll(PDO::FETCH_ASSOC);
                $memberClassBuy_row=$memberClassBuy->fetchAll(PDO::FETCH_ASSOC);
                $memberClassCollection_row=$memberClassCollection->fetchAll(PDO::FETCH_ASSOC);
                $memberArticle_row=$memberArticle->fetchAll(PDO::FETCH_ASSOC);
                $memberPostCard_row=$memberPostCard->fetchAll(PDO::FETCH_ASSOC);
                $memberOrder_row=$memberOrder->fetchAll(PDO::FETCH_ASSOC);
                $memberOrderCount_row=$memberOrderCount->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($memberDataAll_row);
                echo json_encode($memberAnalysis_row);
                echo json_encode($memberClassBuy_row);
                echo json_encode($memberClassCollection_row);
                echo json_encode($memberArticle_row);
                echo json_encode($memberPostCard_row);
                echo json_encode($memberOrder_row);
                echo json_encode($memberOrderCount_row);
            }
        }
    }catch(PDOException $e){
    }
?>