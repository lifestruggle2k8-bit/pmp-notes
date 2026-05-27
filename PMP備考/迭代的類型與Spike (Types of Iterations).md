---
title: "Course: PMP Certification Exam Prep Course 35 PDU Contact Hours/PDU | Udemy"
description: >-
  Get your PMP Certification with this course. Fully updated for the Current PMP
  Exam
author: Udemy
source: >-
  https://www.udemy.com/course/pmp-certification-exam-prep-course-pmbok-6th-edition/learn/lecture/23858916#questions
created: "2026-05-27"
tags:
  - hover-notes
  - udemy
---
# 迭代的類型 (Types of Iterations) 與尖峰技術終極實戰指南

在敏捷專案管理中，並非所有的迭代（Iterations / Sprints）都在日以繼夜地敲擊鍵盤生產功能。為了確保專案具備剛性的架構韌性與風險防禦力，敏捷將迭代依據功能屬性劃分為不同的特殊類型，並引入 **Spikes（尖峰研究）** 作為探索未知的強效探照燈。

## 一、 敏捷專案三大生命週期迭代類型

一個完整的敏捷專案從開局、中場衝刺到收尾，會交織經歷以下三種不同性質的迭代：

```
 📊 敏捷專案迭代生命週期的演進光譜：
 
  【🧱 Iteration 0 (零號迭代)】 ──► 【🟢 Development Iteration (開發迭代)】 ──► 【🛡️ Iteration H (硬化迭代)】
   (奠定基礎、不構建實際產品)          (實際構建產品增量：Iteration 1, 2, 3...)     (位於專案末尾、代碼清理與文件)
   決定編碼軟體、確定執行方針          透過小規模增量降低風險、交付商業價值          全力重構重度除錯、消滅不良習慣
```

1. **Iteration 0 (零號迭代) ──► 奠定基礎的準備階段**
    
    - _核心特性_：專門**用於為後續的開發工作奠定堅實的基礎（Set the stage for development efforts）**.
        
    - _剛性邊界_：**此階段絕對不進行實際產品的構建（Doesn't build anything）**.
        
    - _實務任務_：主要讓團隊成員在此階段熟悉工作內容與環境，例如：**決定團隊要使用的編碼軟體、確定專案的核心執行方法與方針準則**.
        
2. **Development Iteration (開發迭代) ──► 價值交付的核心期**
    
    - _核心特性_：用於**實際構建、開發並交付可運行的產品增量（Build the product increment）**.
        
    - _實務命名_：即專案中日常循環的 **Iteration 1, 2, 3, 4, 5...** 等標準衝刺時間盒.
        
3. **Iteration H (Hardening Sprint / Release / 硬化迭代) ──► 清道夫收尾階段**
    
    - _核心特性_：刻意**位於整個專案或發佈週期最末尾的收尾階段**.
        
    - _戰略目的_：全力**進行代碼清理（Clean up codes）與編寫專案必備的交付文件（Producing documentation）**.
        
    - _精實實踐_：此階段**強烈強調進行代碼重構（Refactoring）**，目的是徹底消滅並**避免專案在前期快速衝刺中累積出不良的編碼習慣（消除技術債）**.
        

## 二、 尖峰研究技術 (Spikes) 的深層解構

- **Spikes 的定義**：指的是**在正式迭代結束前（或開始前）所進行的短暫、高度聚焦的研究任務**. 它的體積通常非常精實，**可能僅需幾個小時的工作量**.
    
- **🛠️ 核心開發路徑邏輯**：
    
    $$\text{執行 Spike 研究任務} \ \ \mathbf{\longrightarrow}\ \ \text{獲取知識/驗證方案可行性} \ \ \mathbf{\longrightarrow}\ \ \text{正式進入 Development Iteration 開發迭代} \text{}$$
    

敏捷引導者依據團隊遭遇的盲點性質，將 Spikes 劃分為兩大硬核攻防類型：

### 1. Architectural Spike (架構尖峰) ──► 技術與可行性的探路先鋒

- **核心目的**：專門用於**正式開始迭代開發前，進行技術概念驗證（Proof of Concept, PoC）的時段**.
    
- **解決的痛點**：當團隊**極度不確定某種新型的編程方法、架構或第三方 API 是否能成功實現特定功能時**，果斷啟動.
    
- **深層管理價值**：**防止團隊在投入大量寶貴的開發產能（例如整整兩週的 Sprint）後，才痛苦地發現該技術方法根本行不通**。先透過 PoC 快速確認可行性，能有效消滅過早承諾的技術重工.
    

### 2. Risk-Based Spike (風險導向尖峰) ──► 阻斷專案脫軌的拆彈專家

- **核心目的**：團隊用來**深度調查、並嘗試降低或消除可能導致專案徹底脫軌（Derail）之重大潛在風險的方法或技術**.
    
- **臨床應用場景**：當專案環境中存在某個可能造成毀滅性影響的巨大不確定性時，團隊會利用這個時段開發出一種實驗方法來應對，並**評估該風險在未來是否完全可控**.
    

## 三、 📝 Risk-Based Spike 臨床實務案例拆解

為了深刻內化風險尖峰的運作邏輯，我們可以導入一個「核心功能失效防禦」的真實研發場景來進行解讀：

- **💥 面臨的毀滅性風險**：
    
    團隊在梳理 Backlog 時，評估某一核心主要功能存在極高風險，**可能在特定高併發大環境下無法如預期運作**（主要功能失效風險）.
    
- **🛡️ 團隊制定的應對策略**：
    
    架構師提出一套理論──準備在主要功能失效時，**調用另一個「替代函數（Secondary function）」來達成相同的業務結果**.
    
- **🚀 執行的 Spike 尖峰任務**：
    
    團隊不盲目把這套理論直接塞進下期衝刺。他們在正式進入開發流程前，**先撥出幾個小時進行風險導向尖峰，獨立測試並瘋狂驗證這個「替代函數」是否真的能在極端環境下發揮作用**。
    
- **🎯 最終防禦目的**：
    
    **鐵腕防止團隊在開發中途，才驚恐地發現原本預想的應對方案（Secondary function）其實也根本無法解決問題**。這項高頻考點能提前排除死胡同，避免開發在迭代中途全面卡關、或導致專案徹底脫軌。
    

## 💡 三點需要牢記的部分

1. **Iteration 0 不寫代碼只搭舞台，Iteration H 全力重構不加範疇，兩者皆是自組織的防火牆**：在備考情境題與實務規畫時，必須精確鎖定這兩個特殊迭代的邊界。**Iteration 0 絕不建立任何實際產品（Doesn't build anything）**，它的唯一使命是決定軟體與方針；而 **Iteration H 是專案末尾的硬化劑**，只准進行 **Clean up codes、Refactoring 與編寫文件**。題目若出現要在這兩個迭代中順便開發新需求（User Stories）的選項，皆為嚴重微管理違規，必須直接排除。
    
2. **Architectural Spike 用 PoC 探明技術死胡同，拒絕「自我感動式」的盲目開發浪費**：請將架構尖峰與**適應性規劃（Adaptive Planning）**、以及粗粒度需求（"Coarse-Grained" Requirements）進行深度跨章節聯想。當團隊面對模糊且不確定的新編程技術時，不要在 Planning 會議上死磕絕對工時。正確的敏捷動作是發起 **Architectural spike**，用幾個小時的極速概念驗證（PoC）來揭露真實可行性，這是精實管理中消滅「兩週後才發現行不通」之龐大非增值浪費（Non-value-added）的最高工法。
    
3. **Risk-Based Spike 是防禦專案脫軌（Derail）的發令槍，應對方案必須在「開火前」完成雙盲驗證**：高頻的敏捷引導與風險管理情境考點請務必死磕本篇的計算與流程邏輯。當專案潛藏巨大毀滅性風險時，僕人式領導者必須引導團隊在正式迭代前執行 Spike。就像會計軟體案例中驗證替代函數一樣，估算時必須將這種風險尖峰的工作量與可用性納入考量，**確保替代方案（Secondary function）在正式衝刺前就通過實質驗證**。這種科學控管不確定性的能力，是維持自組織團隊Groove與速率圖穩定的關鍵硬底子。