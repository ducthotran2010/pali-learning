---
layout: language
title: "Tổng hợp"
permalink: /pali/all
sections:
  - title: Danh từ nam tính vĩ từ 'a'
    anchor: masculine-nouns-a
  - title: Danh từ nam tính vĩ từ 'i'
    anchor: masculine-nouns-i
  - title: Danh từ nam tính vĩ từ 'ī'
    anchor: masculine-nouns-ii
  - title: Danh từ nam tính vĩ từ 'u'
    anchor: masculine-nouns-u
  - title: Danh từ nam tính vĩ từ 'u' bất quy tắc (Mẫu Pitu/pitar)
    anchor: masculine-nouns-u-irregular-pitu
  - title: Danh từ nam tính vĩ từ 'u' bất quy tắc (Mẫu Kattu/kattār)
    anchor: masculine-nouns-u-irregular-kattu
  - title: Danh từ nam tính vĩ từ 'vantu/mantu'
    anchor: masculine-nouns-vantu-mantu
  - title: Danh từ nam tính vĩ từ 'ū'
    anchor: masculine-nouns-uu
  - title: Danh từ nữ tính vĩ từ 'ā'
    anchor: feminine-nouns-aa
  - title: Danh từ nữ tính vĩ từ 'i'
    anchor: feminine-nouns-i
  - title: Danh từ nữ tính vĩ từ 'ī'
    anchor: feminine-nouns-ii
---

<div class="content-filters">
  <button id="show-all" class="filter-btn active">Tất cả (All)</button>
  <button id="show-tables" class="filter-btn">Chỉ bảng chia (Tables Only)</button>
  <button id="show-vocab" class="filter-btn">Chỉ từ vựng (Vocab Only)</button>
</div>

<style>
.content-filters {
  margin: 20px 0;
  text-align: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
}

.filter-btn {
  background: #f8f9fa;
  border: 1px solid #ddd;
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: #e9ecef;
}

.filter-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.declension-content {
  transition: opacity 0.3s ease;
}

.vocab-content {
  transition: opacity 0.3s ease;
}

.hidden {
  display: none;
}
</style>

## Danh từ nam tính vĩ từ 'a'
{: #masculine-nouns-a}

{% include pali/masculine-nouns-a/declension.md %}

{% include pali/masculine-nouns-a/vocab.md %}

## Danh từ nam tính vĩ từ 'vantu/mantu'
{: #masculine-nouns-vantu-mantu}

{% include pali/masculine-nouns-vantu-mantu/declension.md %}

{% include pali/masculine-nouns-vantu-mantu/vocab.md %}

## Danh từ nam tính vĩ từ 'i'
{: #masculine-nouns-i}

{% include pali/masculine-nouns-i/declension.md %}

{% include pali/masculine-nouns-i/vocab.md %}

## Danh từ nam tính vĩ từ 'ī'
{: #masculine-nouns-ii}

{% include pali/masculine-nouns-ii/declension.md %}

![Danh từ nam tính vĩ từ 'ī' - Từ vựng](../../../assets/images/masculine-nouns-ii-vocabulary.png)

{% include pali/masculine-nouns-ii/vocab.md %}

## Danh từ nam tính vĩ từ 'u'
{: #masculine-nouns-u}

{% include pali/masculine-nouns-u/declension.md %}

{% include pali/masculine-nouns-u/vocab.md %}

## Danh từ nam tính vĩ từ 'u' bất quy tắc (Mẫu Pitu/pitar)
{: #masculine-nouns-u-irregular-pitu}

{% include pali/masculine-nouns-u-irregular-pitu/declension.md %}

{% include pali/masculine-nouns-u-irregular-pitu/vocab.md %}

## Danh từ nam tính vĩ từ 'u' bất quy tắc (Mẫu Kattu/kattār)
{: #masculine-nouns-u-irregular-kattu}

{% include pali/masculine-nouns-u-irregular-kattu/declension.md %}

{% include pali/masculine-nouns-u-irregular-kattu/vocab.md %}

## Danh từ nam tính vĩ từ 'ū'
{: #masculine-nouns-uu}

{% include pali/masculine-nouns-uu/declension.md %}

{% include pali/masculine-nouns-uu/vocab.md %}

## Danh từ nữ tính vĩ từ 'ā'
{: #feminine-nouns-aa}

{% include pali/feminine-nouns-aa/declension.md %}

{% include pali/feminine-nouns-aa/vocab.md %}

![Danh từ nữ tính vĩ từ 'ā' - Từ vựng](../../../assets/images/feminine-nouns-aa-vocabulary.png)

## Danh từ nữ tính vĩ từ 'i'
{: #feminine-nouns-i}

{% include pali/feminine-nouns-i/declension.md %}

{% include pali/feminine-nouns-i/vocab.md %}

## Danh từ nữ tính vĩ từ 'ī'
{: #feminine-nouns-ii}

{% include pali/feminine-nouns-ii/declension.md %}

{% include pali/feminine-nouns-ii/vocab.md %}

![Danh từ nữ tính vĩ từ 'ī' - Bảng chia và từ vựng](../../../assets/images/feminine-nouns-ii-vocabulary.png)

<script>
document.addEventListener('DOMContentLoaded', function() {
    const showAllBtn = document.getElementById('show-all');
    const showTablesBtn = document.getElementById('show-tables');
    const showVocabBtn = document.getElementById('show-vocab');

    const declensionContents = document.querySelectorAll('.declension-content');
    const vocabContents = document.querySelectorAll('.vocab-content');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function setActiveButton(activeBtn) {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    function showAll() {
        declensionContents.forEach(content => content.classList.remove('hidden'));
        vocabContents.forEach(content => content.classList.remove('hidden'));
        setActiveButton(showAllBtn);
    }

    function showTablesOnly() {
        declensionContents.forEach(content => content.classList.remove('hidden'));
        vocabContents.forEach(content => content.classList.add('hidden'));
        setActiveButton(showTablesBtn);
    }

    function showVocabOnly() {
        declensionContents.forEach(content => content.classList.add('hidden'));
        vocabContents.forEach(content => content.classList.remove('hidden'));
        setActiveButton(showVocabBtn);
    }

    showAllBtn.addEventListener('click', showAll);
    showTablesBtn.addEventListener('click', showTablesOnly);
    showVocabBtn.addEventListener('click', showVocabOnly);
});
</script>
