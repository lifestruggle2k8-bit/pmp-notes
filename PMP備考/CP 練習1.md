---
title: "Course: PMP Certification Exam Prep Course 35 PDU Contact Hours/PDU | Udemy"
description: >-
  Get your PMP Certification with this course. Fully updated for the Current PMP
  Exam
author: Udemy
source: >-
  https://www.udemy.com/course/pmp-certification-exam-prep-course-pmbok-6th-edition/learn/lecture/13040026#overview
created: "2026-05-11"
tags:
  - hover-notes
  - udemy
---
在專案時程管理的學習過程中，網路圖的繪製與計算是建立邏輯直覺最有效的方式。透過這套完整的實作流程，我們將一步步解構如何從雜亂的活動數據中，精確鎖定專案的關鍵交期與彈性空間。

---

## 一、 網路圖結構與關鍵路徑（CP）判定

在動筆計算前，必須先建立專案的「骨架」。建議將圖表盡可能畫大，以便於在方框上下標註數值。

![project network diagram (由 AI 生成)](https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTQg3HCVZ5Z9o7BHcWWtn1TKQ2eAu4okvxBzZMJpBm0wJc06lFyijHMUw-aTKiU0eViM5Z8l3TKcVECOS9Dc90tGX2UnUco_HAqiL7CLFOi1KqQNH8)

Shutterstock

### 1. 練習數據設定

- **活動 A**：3 天
    
- **活動 B**：4 天
    
- **活動 C**：6 天
    
- **活動 D**：4 天
    
- **活動 E**：3 天
    

### 2. 路徑分析

透過找出所有可能的路徑，我們可以先判定關鍵路徑（時程最長的路徑）：

- **路徑 1 (A-B-C-E)**：$3 + 4 + 6 + 3 = 16$ 天。
    
- **路徑 2 (A-B-D-E)**：$3 + 4 + 4 + 3 = 14$ 天。
    
- **結論**：**關鍵路徑為 A-B-C-E**，專案總時長為 **16 天**。
    

---

## 二、 前向傳遞 (Forward Pass)：找出「早開始」與「早結束」

前向傳遞的核心公式為：$EF = ES + Duration - 1$。

|**活動**|**早期開始 (ES)**|**推算邏輯**|**早期完成 (EF)**|
|---|---|---|---|
|**A**|第 1 天|專案始於第 1 天|$1 + 3 - 1 = \mathbf{3}$|
|**B**|第 4 天|A 結束的隔天|$4 + 4 - 1 = \mathbf{7}$|
|**C**|第 8 天|B 結束的隔天|$8 + 6 - 1 = \mathbf{13}$|
|**D**|第 8 天|B 結束的隔天|$8 + 4 - 1 = \mathbf{11}$|
|**E**|**第 14 天**|**匯合點**：取 C(13) 與 D(11) 的最大值再加 1|$14 + 3 - 1 = \mathbf{16}$|

> **驗證**：前向傳遞最終得到的第 16 天與關鍵路徑分析吻合，證實計算無誤。

---

## 三、 後向傳遞 (Backward Pass)：找出「晚開始」與「晚結束」

從最後一個活動 E 開始回推，公式為：$LS = LF - Duration + 1$。

- **活動 E**：$LF = 16$，則 $LS = 16 - 3 + 1 = \mathbf{14}$。
    
- **活動 C**：其後續為 E ($LS = 14$)，則 $LF = 13$。$LS = 13 - 6 + 1 = \mathbf{8}$。
    
- **活動 D**：其後續為 E ($LS = 14$)，則 $LF = 13$。$LS = 13 - 4 + 1 = \mathbf{10}$。
    
- **活動 B**：**分叉點**：回推時比較 C ($LS = 8$) 與 D ($LS = 10$)，取其**較小值**並減 1，故 $LF = 7$。$LS = 7 - 4 + 1 = \mathbf{4}$。
    
- **活動 A**：$LF = 4 - 1 = 3$。$LS = 3 - 3 + 1 = \mathbf{1}$。
    

---

## 四、 時差 (Float) 計算實務：以活動 D 為例

完成上述運算後，我們可以輕鬆量化非關鍵路徑活動的「彈性」。

### 1. 總時差 (Total Float)

衡量對「整個專案交期」的影響：

- 公式：$LF - EF$ 或 $LS - ES$。
    
- 計算：$13 - 11 = \mathbf{2}$ 天。
    
- **意義**：活動 D 最多可以延遲 2 天而不影響第 16 天的最終交期。
    

### 2. 自由時差 (Free Float)

衡量對「下一個活動」的影響：

- 公式：$ES_{next} - EF_{current} - 1$。
    
- 計算：$14 (E) - 11 (D) - 1 = \mathbf{2}$ 天。
    
- **意義**：活動 D 即使延遲 2 天結束，活動 E 仍可維持在第 14 天開始。
    

---

## 五、 分析流程總結

要確保時程題目取得滿分，請務必按照這四個步驟進行：

1. **前向傳遞**：取最大 EF 值匯合。
    
2. **後向傳遞**：取最小 LS 值回推。
    
3. **判定 CP**：時差（Float）為 0 的路徑。
    
4. **計算時差**：釐清對「整體」與「局部」的彈性空間。