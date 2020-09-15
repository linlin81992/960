<?php
    try{
        require_once("./connectMySql.php");
        if( $pdo != false ){

            $sql = "select industry_class.IND_NO, industry_class.IND_CLASS, industry_class.IND_COLOR, industry_introduce.IND_INT_NO, industry_introduce.IND_INT_NAME, industry_introduce.IND_INT_PICTURE from `industry_introduce` join `industry_class` on industry_introduce.ind_no = industry_class.ind_no group by industry_class.IND_NO, industry_introduce.IND_INT_NO";
            $sqlSalaryRank = "SELECT industry_introduce.IND_INT_NAME '職業名稱', IND_SAL_STEP_DISTANCE '薪資區間', (IND_SAL_LOW+IND_SAL_HIGH)/2 '薪資平均' FROM `industry_salary` join `industry_introduce` on industry_salary.IND_INT_NO = industry_introduce.IND_INT_NO WHERE `IND_SAL_STEP_DISTANCE` = '三到五年' order by (IND_SAL_LOW+IND_SAL_HIGH)/2 desc limit 5";
            $sqlDiscuss = "select industry_class.IND_NO, industry_class.IND_CLASS, industry_class.IND_COLOR, discuss_area.DIS_NO, discuss_area.DIS_NAME, discuss_area.DIS_CLASS from `discuss_area` join `industry_class` on discuss_area.ind_no = industry_class.ind_no where discuss_area.DIS_HIDDEN = 1 group by industry_class.IND_NO, discuss_area.DIS_NO";
            $sqlSkill = "select industry_class.IND_NO, industry_class.IND_CLASS, skill_class.SKI_NO, skill_class.SKI_NAME, skill_class.SKI_BUY_NUM, skill_class.SKI_PRICE, skill_class.SKI_TIME, skill_class.SKI_IMG from `skill_class` join `industry_class` on skill_class.ind_no = industry_class.ind_no where skill_class.SKI_HIDDEN = 1 group by industry_class.IND_NO, skill_class.SKI_NO";
            $carreerProfessionAll = $pdo -> query($sql);
            $careerSalaryRank = $pdo -> query($sqlSalaryRank);
            $careerDiscuss = $pdo -> query($sqlDiscuss);
            $careerSkill = $pdo -> query($sqlSkill);
            if($carreerProfessionAll -> rowCount() == 0){
                echo "沒資料";
            }
            else{
                $check_value = Array();
                $check_valuerr = Array();
                $carreerProfessionAll_row=$carreerProfessionAll->fetchAll(PDO::FETCH_ASSOC);
                $careerSalaryRank_row=$careerSalaryRank->fetchAll(PDO::FETCH_ASSOC);
                $careerDiscuss_row=$careerDiscuss->fetchAll(PDO::FETCH_ASSOC);
                $careerSkill_row=$careerSkill->fetchAll(PDO::FETCH_ASSOC);
                // foreach ( $carreerProfessionAll_row as $i => $carreerProfessionAllRow){
                //     $check_value[] = $carreerProfessionAllRow["IND_INT_NAME"];
                //     $check_valuerr[] = $carreerProfessionAllRow["IND_CLASS"];
                // }
                // echo json_encode($check_value);
                // echo json_encode($check_valuerr);
                echo json_encode($carreerProfessionAll_row);
                echo json_encode($careerSalaryRank_row);
                echo json_encode($careerDiscuss_row);
                echo json_encode($careerSkill_row);
                // echo gettype((array)$member_row);
            }
        }
    }catch(PDOException $e){
    }
?>