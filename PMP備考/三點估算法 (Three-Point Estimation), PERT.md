---
title: "Course: PMP Certification Exam Prep Course 35 PDU Contact Hours/PDU | Udemy"
description: >-
  Get your PMP Certification with this course. Fully updated for the Current PMP
  Exam
author: Udemy
source: >-
  https://www.udemy.com/course/pmp-certification-exam-prep-course-pmbok-6th-edition/learn/lecture/39347286#overview
created: "2026-05-11"
tags:
  - hover-notes
  - udemy
---
在專案管理中，當我們面對不確定性較高的任務時，單一數值的估算往往帶有巨大風險。**計畫評核術 (PERT)**，又稱為**三點估算法 (Three-Point Estimation)**，就是為了透過加權平均來降低這種風險而存在的工具。

既然您正在衝刺 **PMP**，這套公式絕對是考場上的「常客」，請務必練到直覺反應的程度。

---

## 一、 PERT 的核心：三個關鍵情境值

為了計算出合理的結果，我們必須先定義出三個不同的數據點：

- **樂觀值 (Optimistic, O)**：一切順利、最好的情況下所需的時間或成本。
    
- **最可能值 (Most Likely, M)**：在正常資源與障礙下，最實際的預期情況。
    
- **悲觀值 (Pessimistic, P)**：遇到最糟障礙、一切都不順利時的情況。
    

---

## 二、 核心計算公式

### 1. PERT 預期工期 (Beta 分布)

這是一種**加權平均**，它給予「最可能值」高達 **4 倍**的權重，使結果更貼近現實。

$$Expected\ Duration = \frac{O + (4 \times M) + P}{6}$$

### 2. 標準差 (Standard Deviation)

用來衡量估算的「不確定性」或「波動範圍」。標準差越大，代表該項目的風險與不確定性越高。

$$Standard\ Deviation\ (\sigma) = \frac{P - O}{6}$$

---

## 三、 實作演練：油漆工程案例

假設您要估算一個辦公室粉刷活動：

- **樂觀 (O)**：2 天
    
- **最可能 (M)**：4 天
    
- **悲觀 (P)**：12 天
    

**計算過程如下：**

1. **加權運算**：$4 \times 4 = 16$
    
2. **加總**：$16 + 2 + 12 = 30$
    
3. **求預期值**：$30 \div 6 = 5$ 天
    
4. **求標準差**：$(12 - 2) \div 6 \approx 1.7$
    

這代表雖然最可能只需 4 天，但考慮到悲觀因素後，我們應以 **5 天** 作為排程基準，且容許約 **±1.7 天** 的波動。

---

## 四、 三點估算的變體：三角分布

如果您不希望給予「最可能值」額外的權重，則可以使用**三角分布 (Triangular Distribution)**。這僅是簡單的算術平均：

$$Triangular\ Average = \frac{O + M + P}{3}$$

依上述案例計算，三角分布的結果為 $(2 + 4 + 12) \div 3 = 6$ 天。通常 PERT 會比三角分布更精確，因為它更強調中間值的發生機率。

---

## 五、 實務應用價值

在現實世界中，這套公式不僅是考題，更是專業 PM 的護身符：

- **軟體支援**：**Microsoft Project** 等工具內建了 PERT 分析功能，您只需輸入三種數值，系統即可自動產出範圍。
    
- **風險溝通**：當利害關係人質疑為什麼要留緩衝時間時，您可以拿出 **標準差 ($\sigma$)** 的數據來說服他們，這是有科學根據的風險預留。