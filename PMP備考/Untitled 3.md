---
title: "Course: PMP Certification Exam Prep Course 35 PDU Contact Hours/PDU | Udemy"
description: >-
  Get your PMP Certification with this course. Fully updated for the Current PMP
  Exam
author: Udemy
source: >-
  https://www.udemy.com/course/pmp-certification-exam-prep-course-pmbok-6th-edition/learn/lecture/13040022#overview
created: "2026-05-11"
tags:
  - hover-notes
  - udemy
---

### 時差 (Float/Slack) 的類型與區別

- **總時差 (Total Float/Slack)**
    - 指在不延誤「整個專案」完成日期的前提下，某個活動可以延遲的時間量。
    - 若某活動的總時差為 0，則該活動位於**關鍵路徑 (Critical Path)** 上，任何延誤都會直接導致專案總時長增加。
- **自由時差 (Free Float)**
    - 指在不延誤「下一個活動」開始日期的前提下，某個活動可以延遲的時間量。
- **兩者差異總結**

| 特性 | 總時差 (Total Float) | 自由時差 (Free Float) |
| --- | --- | --- |
| 影響範圍 | 影響整個專案的完成日期 | 僅影響緊鄰的下一個活動 |
| 關鍵路徑 | 關鍵路徑上的活動總時差皆為 0 | 若活動在關鍵路徑上，其自由時差通常也為 0 |

### 自由時差 (Free Float) 的計算與特性

- **計算公式**
    - 自由時差是用來計算在不影響「下一個活動」的前提下，當前活動可以延遲多久：
    - $$\text{Free Float} = (\text{下一個活動的 Early Start}) - (\text{當前活動的 Early Finish}) - 1$$
    - **範例計算**：
        - 若活動 A 的 Early Finish 為 3
        - 下一個活動 B 的 Early Start 為 4
        - 計算方式：$4 - 3 - 1 = 0$ (表示 A 沒有自由時差)
- **關鍵路徑上的特性**
    - 位於關鍵路徑上的活動不僅**總時差 (Total Float) 為 0**，其**自由時差 (Free Float) 也同樣為 0**
    - **原因**：因為在關鍵路徑上，任何活動的延誤都會立即導致下一個活動延誤，進而產生連鎖反應，最終延誤整個專案的完成日期。

### 自由時差 (Free Float) 的實例計算

- **活動 B 的自由時差計算**
    - 由於活動 B 之後會分支出兩個活動（C 與 D），在計算 B 的自由時差時，應使用後續活動中**最早開始 (Early Start)** 的那一個作為基準
    - **計算過程**：
        - 下一個活動（C 或 D）的 Early Start：6
        - 當前活動 B 的 Early Finish：5
        - 公式：$6 - 5 - 1 = 0$
    - **結論**：活動 B 的自由時差為 0
- **活動 D 的自由時差計算**
    - 活動 D 為轉換至活動 E 的前置作業，且已知活動 D 具有一定的時差 (Slack)
    - **計算參數**：
        - 下一個活動 E 的 Early Start：10

### 自由時差 (Free Float) 的計算實例

- **活動 D 的計算範例**
    - 假設活動 D 的 Early Start (下一個活動的開始時間) 為 10
    - 活動 D 的 Early Finish (當前活動的結束時間) 為 8
    - **計算過程**：
        - $\text{Free Float} = 10 - 8 - 1 = 1$
    - **結論**：活動 D 擁有 1 天的自由時差
- **總時差與自由時差的並存**
    - 在上述案例中，活動 D 不僅擁有 1 天的**總時差 (Total Float)**，同時也擁有 1 天的**自由時差 (Free Float)**
    - 這代表延遲活動 D 一天，既不會延誤整個專案，也不會影響下一個活動的開始時間