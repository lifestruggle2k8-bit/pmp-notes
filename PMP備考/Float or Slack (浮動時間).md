---
title: "Course: PMP Certification Exam Prep Course 35 PDU Contact Hours/PDU | Udemy"
description: >-
  Get your PMP Certification with this course. Fully updated for the Current PMP
  Exam
author: Udemy
source: >-
  https://www.udemy.com/course/pmp-certification-exam-prep-course-pmbok-6th-edition/learn/lecture/13040010#overview
created: "2026-05-11"
tags:
  - hover-notes
  - udemy
---
在專案時程管理中，理解 **Float**（或稱 **Slack**，即浮動時間）是掌握關鍵路徑法的核心。這代表了專案活動的「彈性」或「緩衝」，讓專案經理能有效應對突發狀況。

---

## 一、 核心概念：定義與數值組成

**Slack**、**Float** 與 **Total Float** 在專案管理實務中指的是相同的概念，通常統稱為 **Float**。它是指在不影響專案最終交期的前提下，某個活動可以延遲的最大時間量。

計算 Float 時，每個活動會圍繞著四個核心的時間點（日期）展開：

- **ES (Early Start)**：該活動最早可以開始的日期。
    
- **EF (Early Finish)**：該活動最早可以完成的日期。
    
- **LS (Late Start)**：在不延遲專案的前提下，活動最晚必須開始的日期。
    
- **LF (Late Finish)**：在不延遲專案的前提下，活動最晚必須完成的日期。
    

> **注意事項**：計算時須假設活動的 **Duration**（持續時間）是固定不變的。這些參數代表的是「特定日期」（例如：第 6 天），而非天數長度。

---

## 二、 計算公式與邏輯驗證

Float 的本質是「最晚時間點」與「最早時間點」之間的差距。你可以選擇以下任一公式進行計算，兩者的結果必然相同：

1. **基於開始時間**：
    
    $$Slack = LS - ES$$
    
2. **基於完成時間**：
    
    $$Slack = LF - EF$$
    

### 實務推算範例

假設活動 D 的持續時間為 **3 天**：

- **正向推算**：若 $ES = 6$，則該活動在第 6、7、8 天執行，故 $EF = 8$。
    
- **反向推算**：若 $LS = 7$，則該活動在第 7、8、9 天執行，故 $LF = 9$。
    
- **計算結果**：
    
    - $LS - ES \rightarrow 7 - 6 = 1$ 天。
        
    - $LF - EF \rightarrow 9 - 8 = 1$ 天。
        
    - 這代表活動 D 擁有 **1 天** 的彈性緩衝。
        

---

## 三、 Float 與關鍵路徑 (Critical Path) 的關係

Float 是判斷活動是否位於關鍵路徑上的唯一標準：

- **有 Float ($Slack > 0$)**：活動具有彈性，不在關鍵路徑上。這意味著只要延遲不超過 Float 的天數，就不會影響專案進度。
    
- **無 Float ($Slack = 0$)**：活動位於**關鍵路徑**上。在這種情況下，$ES = LS$ 且 $EF = LF$，任何微小的延遲都會直接導致整個專案的結束日期推遲。
    

---

## 四、 網路圖的計算流程

要找出所有活動的四個時間參數，必須執行完整的網路分析：

- **正向路徑 (Forward Pass)**：由前向後計算，決定所有的 **ES** 與 **EF**。
    
- **反向路徑 (Backward Pass)**：由後向前計算，決定所有的 **LS** 與 **LF**。
    

掌握了這些計算技巧，你就能在複雜的網路圖中精確定位風險點（關鍵路徑）與資源優化點（具備 Float 的活動）。