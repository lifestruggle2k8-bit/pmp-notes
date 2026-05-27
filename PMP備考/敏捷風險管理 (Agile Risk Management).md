---
title: "Course: PMP Certification Exam Prep Course 35 PDU Contact Hours/PDU | Udemy"
description: >-
  Get your PMP Certification with this course. Fully updated for the Current PMP
  Exam
author: Udemy
source: >-
  https://www.udemy.com/course/pmp-certification-exam-prep-course-pmbok-6th-edition/learn/lecture/23858946#questions
created: "2026-05-27"
tags:
  - hover-notes
  - udemy
---
# 風險量化、評估與動態管理終極實戰指南

在敏捷專案管理中，價值交付的另一面就是**風險管理**。敏捷不採取期初寫完風險清單就封箱的官僚做法，而是將風險視為一個貫穿全生命週期的動態變數。敏捷風險管理的核心流程可精煉為：**「識別風險 (Identify Risk) $\rightarrow$ 評估並了解其對專案的影響 (Know the Impact) $\rightarrow$ 實施應對並動態重排待辦清單」**。

## 一、 雙軌風險量化與排名方法 (Ranking Risks)

為了對眾多潛在風險進行科學的優先級排序（Ranking），專案經理與團隊必須掌握以下兩種理性的定量評估工具：

### 1. 財務視角：期望貨幣價值 (Expected Monetary Value, EMV)

- **核心用途**：用於精準評估風險對專案所產生的**潛在財務影響成本**。
    
- **計算公式**：
    
    $$\text{\textbf{EMV}} = \text{\textbf{Impact} (貨幣化影響金額)} \times \text{\textbf{Probability} (發生機率)}$$
    

#### 🧮 EMV 臨床案例比較：

- **風險 A** ── 影響 (Impact): $\$10,000$ | 機率 (Probability): $10\%$
    
    $$\text{EMV} = 10,000 \times 10\% = \mathbf{\$1,000}$$
    
- **風險 B** ── 影響 (Impact): $\$50,000$ | 機率 (Probability): $5\%$
    
    $$\text{EMV} = 50,000 \times 5\% = \mathbf{\$2,500}$$
    
- **⚖️ 決策結論**：雖然風險 B 的發生機率（$5\%$）低於風險 A，但因為其交叉加權後的 **EMV ($\$2,500$) 顯著高於風險 A ($\$1,000$)**，因此在風險排名與防禦資源分配中，**風險 B 具備更高的優先級**。
    

### 2. 機率與影響矩陣：數字量表法 (Number Scale)

當風險難以直接用貨幣衡量時，團隊可改採更為直觀的數字量表評分制（常見如 1 到 5 分制）：

- **計算公式**：
    
    $$\text{\textbf{風險嚴重程度 (Risk Severity)}} = \text{\textbf{Probability} (機率: 1-5)} \times \text{\textbf{Impact} (影響: 1-5)}$$
    

#### 🧮 數字量表臨床案例比較：

- **🌋 地震 (Earthquake)** ────── 機率 (Prob): $1$ | 影響 (Impact): $5$ ➔ $\text{風險評分} = 1 \times 5 = \mathbf{5}$
    
- **❄️ 大雪暴 (Big Snowstorm)** ── 機率 (Prob): $3$ | 影響 (Impact): $3$ ➔ $\text{風險評分} = 3 \times 3 = \mathbf{9}$
    
- **⚖️ 決策結論**：雖然單看破壞力「地震」的極端影響力（$5$）遠大於大雪暴，但若綜合考量發生機率後，**大雪暴的風險嚴重程度得分（$9$）高於地震（$5$）**。因此在日常備災計畫中，大雪暴的風險排名更靠前。
    

## 二、 戰術落地：風險調整後待辦清單 (Risk Adjusted Backlog)

定量評估出風險排名後，敏捷團隊絕對不會乾等著風險發生。

- **動態重組機制**：在團隊決定了風險應對策略（Risk Response）後，PO 與團隊必須將風險減緩任務（如：執行一個 **Risk-Based Spike** 或架構概念驗證 PoC）轉化為具體的待辦項目，並**鐵腕插入 Product Backlog 的對應價值堆疊中**。
    
- **價值與風險的權衡**：這讓待辦清單的排序同時兼顧了「創造黃金商業價值」與「消滅毀滅性風險」，實踐真正的適應性規劃（Adaptive Planning）。
    

## 三、 高視覺化雷達：風險燃盡圖 (Risk Burndown Chart)

- **核心定義**：一種專門用來**視覺化顯示專案中「風險嚴重程度總量 (Risk Severity)」隨時間軸與迭代推移變化趨勢的圖表**。
    
- **終極功能**：強效追蹤風險管理與 Response 的實質效果，**確保風險總量在專案生命週期中健康地趨於下降**。
    

### 🔍 圖表範例與動態權衡特徵（Legend Interpretation）

風險燃盡圖最硬核的價值在於：它能誠實揭示**不同風險項在專案不同生命週期階段中，其「嚴重程度（Risk Severity）」隨時間產生的高低動態起伏與影響力權重轉移**：

```
                    📈 專案生命週期中不同風險嚴重程度的動態起伏：
                    
       ▲【🪪 離岸資源簽證 (Visa of offshore resources)】
       │   ➔ 在專案初期（Iteration 0 ~ 1）具有【最高規的嚴重程度】。
       │   ➔ 因為初期第一線專家能否及時到位，對專案能否順利啟動與奠定基礎有決定性影響。
       │   ➔ 到了專案後期，人員已編組完成，此風險嚴重程度會自動大幅衰減。
       │
       │【💻 伺服器準時交付 (Delivery of servers on time)】
       │   ➔ 在專案初期（初期階段）嚴重程度與衝擊力【相對較低】。
       │   ➔ 隨著時間持續推移、專案進入中後期開火階段，若硬體伺服器仍未能如期抵達，
       │      它對交付里程碑的衝擊 (Impact) 會呈指數級暴衝，嚴重程度【大幅攀升】。
       │
       ▼【 Funds Shortage / Availability of developers 】 ─► 隨著範疇增減動態重排其權重。
```

- **開發人員可用性 (Availability of expert developers)**：在專案中前期對架構設計與核心功能（INVEST 故事）的擊穿影響力極大；但到了專案接近尾聲（如結尾的硬化迭代 Iteration H）時，開發人力短缺對整體專案目標的顛覆性影響就會相對顯著減輕。
    

## 💡 三點需要牢記的部分

1. **影響大不等於風險高，機率乘影響（Severity）才是排定 Backlog 優先級的科學唯一依據**：在備考與實務決策時，必須死磕 **EMV** 與 **Risk Severity** 的乘法公式。題目極其喜歡用「地震、核心功能全毀」等巨大衝擊（Impact = 5）來誘騙考生直接將其排在第一順位。必須保持清醒，綜合乘以其極低的發生機率後，採用最終的嚴重程度得分或貨幣化 EMV 進行理性排名，這才是僕人式領導者客觀配置精實產能的防禦盾牌。
    
2. **Spike 是清償風險的雷達，風險調整後待辦清單（Risk Adjusted Backlog）是拒絕官僚的動態展現**：請將本篇觀念與先前學過的 **Risk-Based Spike（風險導向尖峰）** 深度跨章節串聯。當識別出高排名的風險（如伺服器可能不合規）時，敏捷的標準動作不是寫報告，而是由 PO 將應對方案直接以故事形式插入 Product Backlog 中，變成 **Risk Adjusted Backlog**。透過在正式迭代前撥出幾個小時執行 Spike 調查，才能鐵腕防止專案在後期徹底脫軌（Derail）。
    
3. **風險燃盡圖是向未來防禦的領先雷達，特定風險的「嚴重程度位移」是時程預測的剛性燃料**：必須精確內化風險燃盡圖的判讀細節。它不是一條死板的下降直線，其中的特定圖例（如伺服器交付風險在初期低、後期高；簽證風險在初期高、後期低）深刻揭示了不確定性隨時間軸的位移。PM 必須利用這張圖向管理層展示風險管理的效果，並結合團隊歷史的 **Throughput（吞吐量）** 與控制界限，動態防禦變更成本曲線的指數攀升，這才是敏捷高視覺化績效追蹤的最高境界。