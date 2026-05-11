---
title: "Course: PMP Certification Exam Prep Course 35 PDU Contact Hours/PDU | Udemy"
description: >-
  Get your PMP Certification with this course. Fully updated for the Current PMP
  Exam
author: Udemy
source: >-
  https://www.udemy.com/course/pmp-certification-exam-prep-course-pmbok-6th-edition/learn/lecture/13040016#overview
created: "2026-05-11"
tags:
  - hover-notes
  - udemy
---
在專案時程管理中，**前向傳遞 (Forward Pass)** 是網路分析的第一步，其核心目的在於從圖表的起點向終點推進，藉此計算出所有活動的**最早開始時間 (Early Start, ES)** 與**最早完成時間 (Early Finish, EF)**。

---

### 一、 前向傳遞的計算規則與公式

進行前向傳遞時，必須遵循一套嚴謹的邏輯來確保時間推算的準確性：

- **起始規則**：與「開始 (Start)」直接相連或專案中的第一個活動，其 **ES** 應始終從**第 1 天 (Day 1)** 開始。
    
- **最早完成時間 (EF) 公式**：
    
    $$EF = ES + Duration - 1$$
    
    - **為何要「減 1」？**：因為計算時包含了起始當天。如果不減 1，會導致多算一天，因為活動是在 ES 當天就已經開始進行了。
        
- **活動間的銜接**：下一個活動的 **ES** 為前一活動 **EF 的隔天**（即 $ES = \text{前一活動 } EF + 1$）。
    

#### 計算範例說明：

- **活動 A**：持續 3 天，ES 為第 1 天。其 EF 為 $1 + 3 - 1 = 3$（包含第 1, 2, 3 天）。
    
- **活動 B**：接續活動 A，其 ES 為第 4 天。若持續 2 天，其 EF 為 $4 + 2 - 1 = 5$（包含第 4, 5 天）。
    

---

### 二、 處理多重依賴關係（收斂路徑）

當一個活動同時依賴於多個前置活動（Predecessors）時，情況會變得稍微複雜，此時必須遵循「**所有工作都完成才能開始**」的原則：

- **決定規則**：取所有前置活動中 **「最早完成時間 (EF)」最大的那一個**，作為決定下一個活動 ES 的依據。
    
- **邏輯**：下一個活動的 $ES = \max(\text{所有前置活動 } EF) + 1$。
    
- **實例**：若活動 E 同時依賴於 C (EF = 第 9 天) 與 D (EF = 第 8 天)，活動 E 必須等到第 9 天 C 完成後，才能在**第 10 天**開始。
    
- **生活化類比**：就像在房間兩側牆壁刷漆，你必須等兩側都刷完（取較晚完成者），才能開始搬入家具。
    

---

### 三、 驗證與後續步驟

完成整個前向傳遞計算後，可以透過以下方式進行初步驗證：

- **關鍵路徑檢查**：觀察計算出的路徑總時程是否與預期的**關鍵路徑 (Critical Path)** 一致。
    
- **正確性判斷**：如果計算結果與關鍵路徑吻合，代表前向傳遞的計算過程極大機率是正確的。
    

當您順利推算出專案中所有活動的最早時間點後，接下來的關鍵任務就是進入**後向傳遞 (Backward Pass)** 階段，用以計算「最晚」時間點並找出浮動時間。