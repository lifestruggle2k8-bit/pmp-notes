---
title: "Course: PMP Certification Exam Prep Course 35 PDU Contact Hours/PDU | Udemy"
description: >-
  Get your PMP Certification with this course. Fully updated for the Current PMP
  Exam
author: Udemy
source: >-
  https://www.udemy.com/course/pmp-certification-exam-prep-course-pmbok-6th-edition/learn/lecture/39347342#overview
created: "2026-05-11"
tags:
  - hover-notes
  - udemy
---

### 量化風險分析 (Quantitative Risk Analysis)

- 目的是對個別風險進行數值化分析，以評估其對專案的具體影響
- **[與定性分析的差異]**
    - **定性分析 (Qualitative Analysis)**：著重於風險排序，將風險依重要程度由高到低排列（描述性、高層次)
    - **量化分析 (Quantitative Analysis)**：著重於數值化，將風險轉化為具體的數據（例如：預算影響金額)
- **[為什麼需要量化分析？]**
    - 在制定風險應對策略 (Risk Responses) 之前，必須先進行數值化評估
    - 能精確掌握風險帶來的成本，而非僅僅知道「成本很高"

| 分析類型 | 特性 | 範例 |
| --- | --- | --- |
| 定性分析 | 描述性、高層次、進行風險排序 | 「若此風險發生，將對預算產生高度影響」 |
| 量化分析 | 數值化、精確、評估具體影響 | 「若此風險發生，將導致 50,000 美元的預算損失」 |

### 量化分析的應用策略

- **[並非針對所有風險]** 不會對每一個風險都進行量化分析
    - 通常只針對經由定性分析後，**排名較高 (Higher ranking)** 的風險進行量化
- **[高門檻與複雜性]** 因為這是一個非常複雜的評估過程
    - **需要專業知識**：無法僅靠網路搜尋或直覺判斷，通常需要產業專家 (Industry experts) 的協助
    - **需要專用工具**：通常需要特定的風險分析軟體來進行計算與建模
- **[專業知識的重要性範例]**
    - 建築工程：若暴風雪導致 20 層大樓工程延誤一週，精確計算損失金額需要深厚的建築成本知識
    - 軟體開發：若伺服器安裝失敗，具備伺服器安裝經驗的專家能更精確地評估其對專案的實際影響
- **[關鍵要素]**
    - **工具與技術**：包含對「不確定性的表示 (Representation of uncertainty)」進行建模
    - **主要輸出**：更新後的風險登記冊 (Risk Register updates)

### 量化分析的工具與技術

- **不確定性的表示 (Representation of Uncertainty)**
    - 用於建模風險發生的不確定程度
    - **機率分佈 (Probability Distribution)**
        - 描述風險發生的可能性
        - 核心邏輯：行為的頻率越高，相關風險發生的機率也越高（例如：開車次數越多，發生車禍的機率越大）
    - **三角與 Beta 分佈 (Triangular & Beta Distribution)**
        - 用於衡量從「最壞情況」到「最好情況」之間的差距
        - 其計算邏輯與 PERT 公式非常相似，皆涉及 Beta 與三角值的計算
- **敏感度分析 (Sensitivity Analysis)**
    - 用於評估特定風險對專案不同面向的實際影響程度
    - **龍捲風圖 (Tornado Chart)**
        - 視覺化工具，幫助專案經理觀察各項風險對專案目標（如成本、進度）的影響力強弱
        - 透過圖表可以直觀看到某項風險可能導致的成本變動範圍（例如：某項開發成本可能增加 15% 或減少 25%）
- **決策分析工具**
    - **自製或外包分析 (Make or Buy Analysis)**

### 決策分析工具 (Decision Tree Analysis)

- **[別名]** 也被稱為 **自製或外包分析 (Make or Buy Analysis)**
- **[運作方式]** 透過計算 **期望貨幣價值 (EMV, Expected Monetary Value)** 來評估風險的財務影響
    - **EMV 的定義**：若風險發生，預期會損失或獲得的金額
    - **計算公式**：

      $$\text{EMV} = \text{風險成本} \times \text{發生機率}$$

    - **[範例 1] 房屋需求風險**
        - 房屋總價：1,000,000 美元
        - 若房屋不符需求或需改建的成本：400,000 美元
        - 發生機率：25%
        - $\text{EMV} = 400,000 \times 25\% = 100,000$ 美元
    - **[範例 2] 老屋翻修風險**
        - 若翻修過程中產生損失：500,000 美元
        - 發生機率：10%
        - $\text{EMV} = 500,000 \times 10\% = 50,000$ 美元

### 決策分析工具 (Decision Tree Analysis) 的進階應用

- **[計算總成本與 EMV 的結合]** 在決策分析中，不僅要看單一風險的 EMV，還要考慮原始成本與風險預期損失的總和
    - **[範例 1] 房屋需求風險**
        - 房屋總價：1,000,000 美元
        - 風險成本 (EMV)：100,000 美元
        - **總預期成本**：1,100,000 美元
    - **[範例 2] 老屋翻修風險**
        - 原始成本：800,000 美元
        - 風險成本 (EMV)：50,000 美元
        - **總預期成本**：850,000 美元
- **[EMV 的核心邏輯]** 當人們詢問「這個風險對我們意味著什麼？」或「會花多少錢？」時，本質上是在詢問風險的影響力與機率之積
    - $\text{EMV} = \text{影響金額 (Impact)} \times \text{發生機率 (Probability)}$

### 風險管理流程的演進與輸出

- **[風險登記冊 (Risk Register) 的階段性變化]** 隨著管理程序的推進，登記冊的內容會變得越來越精確
    - **識別風險階段 (Identify Risk)**：建立清單，列出所有可能的風險項目
    - **定性分析階段 (Qualitative Assessment)**：進行風險排序 (Ranking)，決定哪些風險需要優先處理
    - **量化分析階段 (Quantitative Analysis)**：為風險賦予具體數值 (Assigning Values)
        - 例如：這項風險會導致多少金額的損失、多少天數的延誤、或多少程度的收益
- **[量化分析的必要性]**
    - **[關鍵前提]** 在制定「風險應對策略 (Risk Responses)」之前，必須先理解風險如何實際影響專案
    - **[評估面向]** 必須明確掌握風險對以下面向的具體影響：
        - 預算 (Budget)
        - 進度 (Schedule)
        - 時間 (Time)
        - 其他專案目標