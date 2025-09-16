---
layout: language
title: "Tổng hợp động từ"
permalink: /pali/all-verbs/
sections:
  - title: Thì Hiện Tại (Vattamānā)
    anchor: verbs-vattamana
  - title: Thì Bất Định Khứ (Ajjatanī)
    anchor: verbs-ajjatani
  - title: Thì Tương lai (Bhavissantī)
    anchor: verbs-bhavissanti
  - title: Lối Mệnh Lệnh (Pañcamī)
    anchor: verbs-pancami
  - title: Lối Khả Năng (Sattamī)
    anchor: verbs-sattami
---

<div class="filter-buttons">
  <button id="showAll" class="filter-btn active">Tất cả (All)</button>
  <button id="showTablesOnly" class="filter-btn">Chỉ bảng chia (Tables Only)</button>
  <button id="showVocabOnly" class="filter-btn">Chỉ ví dụ (Examples Only)</button>
</div>

## Thì Hiện Tại (Vattamānā)
{: #verbs-vattamana}

<div class="declension-content" markdown="1">

{% include pali/verbs-vattamana/declension.md %}

</div>

<div class="vocab-content" markdown="1">

{% include pali/verbs-vattamana/example.md %}

</div>

## Thì Bất Định Khứ (Ajjatanī)
{: #verbs-ajjatani}

<div class="declension-content" markdown="1">

{% include pali/verbs-ajjatani/declension.md %}

</div>

<div class="vocab-content" markdown="1">

{% include pali/verbs-ajjatani/example.md %}

</div>

## Thì Tương lai (Bhavissantī)
{: #verbs-bhavissanti}

<div class="declension-content" markdown="1">

{% include pali/verbs-bhavissanti/declension.md %}

</div>

<div class="vocab-content" markdown="1">

{% include pali/verbs-bhavissanti/example.md %}

</div>

## Lối Mệnh Lệnh (Pañcamī)
{: #verbs-pancami}

<div class="declension-content" markdown="1">

{% include pali/verbs-pancami/declension.md %}

</div>

<div class="vocab-content" markdown="1">

{% include pali/verbs-pancami/example.md %}

</div>

## Lối Khả Năng (Sattamī)
{: #verbs-sattami}

<div class="declension-content" markdown="1">

{% include pali/verbs-sattami/declension.md %}

</div>

<div class="vocab-content" markdown="1">

{% include pali/verbs-sattami/example.md %}

</div>

<style>
.filter-buttons {
  margin-bottom: 20px;
  text-align: center;
}

.filter-btn {
  padding: 8px 16px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background: #f8f8f8;
  cursor: pointer;
  border-radius: 4px;
}

.filter-btn.active {
  background: #007cba;
  color: white;
  border-color: #005a87;
}

.hidden {
  display: none;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const showAllBtn = document.getElementById('showAll');
  const showTablesBtn = document.getElementById('showTablesOnly');
  const showVocabBtn = document.getElementById('showVocabOnly');

  const declensionContent = document.querySelectorAll('.declension-content');
  const vocabContent = document.querySelectorAll('.vocab-content');

  function setActiveButton(activeBtn) {
    [showAllBtn, showTablesBtn, showVocabBtn].forEach(btn => {
      btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
  }

  showAllBtn.addEventListener('click', function() {
    setActiveButton(this);
    declensionContent.forEach(el => el.classList.remove('hidden'));
    vocabContent.forEach(el => el.classList.remove('hidden'));
  });

  showTablesBtn.addEventListener('click', function() {
    setActiveButton(this);
    declensionContent.forEach(el => el.classList.remove('hidden'));
    vocabContent.forEach(el => el.classList.add('hidden'));
  });

  showVocabBtn.addEventListener('click', function() {
    setActiveButton(this);
    declensionContent.forEach(el => el.classList.add('hidden'));
    vocabContent.forEach(el => el.classList.remove('hidden'));
  });
});
</script>