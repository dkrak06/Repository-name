/* ==========================================================================
   SAGE 황칠(黃漆) 프리미엄 랜딩페이지 인터랙티브 스크립트
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 테마 스위처 (황칠문 Night 🌙 <-> 황칠삼 Day ☀️)
  const themeSwitchBtn = document.getElementById('themeSwitchBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  let currentTheme = localStorage.getItem('sage_theme') || 'night';

  function applyTheme(theme) {
    if (theme === 'day') {
      document.documentElement.setAttribute('data-theme', 'day');
      themeIcon.textContent = '☀️';
      themeText.textContent = '황칠삼(낮) 모드';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.textContent = '🌙';
      themeText.textContent = '황칠문(밤) 모드';
    }
    localStorage.setItem('sage_theme', theme);
  }

  applyTheme(currentTheme);

  if (themeSwitchBtn) {
    themeSwitchBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'night' ? 'day' : 'night';
      applyTheme(currentTheme);
    });
  }

  // 2. 히어로 쇼케이스 듀얼 탭 (황칠삼 vs 황칠문)
  const heroTabs = document.querySelectorAll('.showcase-tab');
  const heroImg = document.getElementById('heroShowcaseImg');
  const heroTitle = document.getElementById('heroShowcaseTitle');
  const heroSub = document.getElementById('heroShowcaseSub');
  const heroBadge = document.getElementById('heroShowcaseBadge');

  const heroData = {
    sam: {
      img: '이미지 모음/황칠삼0.jpg',
      title: '황칠삼 (산삼을 품은 황칠)',
      sub: '활기찬 아침을 여는 100년근 산삼 배양근의 생명력',
      badge: '☀️ 모닝 활력 루틴'
    },
    moon: {
      img: '이미지 모음/황칠문0.jpg',
      title: '황칠문 (달을 품은 황칠)',
      sub: '편안한 밤과 깊은 숙면을 위한 소나무 복령의 조화',
      badge: '🌙 나이트 릴렉스 루틴'
    }
  };

  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      heroTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.target;
      if (heroData[target]) {
        heroImg.style.opacity = '0.3';
        setTimeout(() => {
          heroImg.src = encodeURI(heroData[target].img);
          heroTitle.textContent = heroData[target].title;
          heroSub.textContent = heroData[target].sub;
          heroBadge.textContent = heroData[target].badge;
          heroImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  // 3. 자가진단 셀프 테스트 인터랙션
  const diagnosisOptions = document.querySelectorAll('.diagnosis-option');
  const resultBox = document.getElementById('diagnosisResult');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');
  const resultCta = document.getElementById('resultCta');

  let selectedDiagnoses = new Set();

  diagnosisOptions.forEach(option => {
    option.addEventListener('click', () => {
      const id = option.dataset.id;
      const type = option.dataset.type; // sam, moon, or both

      if (selectedDiagnoses.has(id)) {
        selectedDiagnoses.delete(id);
        option.classList.remove('checked');
      } else {
        selectedDiagnoses.add(id);
        option.classList.add('checked');
      }

      evaluateDiagnosis();
    });
  });

  function evaluateDiagnosis() {
    let samCount = 0;
    let moonCount = 0;

    diagnosisOptions.forEach(opt => {
      if (opt.classList.contains('checked')) {
        const type = opt.dataset.type;
        if (type === 'sam') samCount++;
        else if (type === 'moon') moonCount++;
        else if (type === 'both') {
          samCount++;
          moonCount++;
        }
      }
    });

    if (selectedDiagnoses.size === 0) {
      resultBox.style.display = 'none';
      return;
    }

    resultBox.style.display = 'block';

    if (samCount > 0 && moonCount > 0) {
      resultTitle.textContent = '🌟 추천 솔루션: 황칠 데이&나이트 올인원 세트 (황칠삼 + 황칠문)';
      resultDesc.textContent = '아침에는 황칠삼으로 강력한 에너지와 활력을 채우고, 밤에는 황칠문으로 하루의 긴장을 풀고 깊은 쉼을 누리는 완벽한 24시간 바이오리듬 케어가 가장 적합합니다.';
      resultCta.onclick = () => selectProductOption('both');
    } else if (samCount > moonCount) {
      resultTitle.textContent = '☀️ 추천 솔루션: 황칠삼 (산삼을 품은 황칠)';
      resultDesc.textContent = '아침 기상이 무겁고 만성 피로가 쌓여있는 상태입니다. 100년근 산삼 배양근과 야생 황칠의 사포닌 시너지로 활력을 되찾아보세요.';
      resultCta.onclick = () => selectProductOption('sam');
    } else {
      resultTitle.textContent = '🌙 추천 솔루션: 황칠문 (달을 품은 황칠)';
      resultDesc.textContent = '야간 뒤척임과 스트레스 완화가 최우선 과제입니다. 신경을 안정시키고 속을 편안하게 다스리는 복령과 황칠문의 은은한 안식향이 편안한 밤을 선물합니다.';
      resultCta.onclick = () => selectProductOption('moon');
    }
  }

  // 4. 제품 라인업 탭 전환 (황칠삼 탭 vs 황칠문 탭)
  const lineupBtns = document.querySelectorAll('.lineup-btn');
  const lineupPanes = document.querySelectorAll('.product-tab-pane');

  lineupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      lineupBtns.forEach(b => b.classList.remove('active'));
      lineupPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(btn.dataset.pane);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 5. 갤러리 썸네일 클릭 시 메인 뷰 전환
  setupGallery('samMainImg', '.sam-thumb');
  setupGallery('moonMainImg', '.moon-thumb');

  function setupGallery(mainId, thumbSelector) {
    const mainImg = document.getElementById(mainId);
    const thumbs = document.querySelectorAll(thumbSelector);

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const newSrc = thumb.getAttribute('data-full');
        if (mainImg && newSrc) {
          mainImg.style.opacity = '0.4';
          setTimeout(() => {
            mainImg.src = encodeURI(newSrc);
            mainImg.style.opacity = '1';
          }, 150);
        }
      });
    });
  }

  // 6. 실시간 가격 계산기 & 옵션 선택 로직
  const productOptions = {
    both: {
      name: '[인기/추천] 데이&나이트 올인원 세트 (황칠삼 50포 + 황칠문 50포)',
      originalPrice: 320000,
      salePrice: 198000,
      discountPercent: 38,
      bonus: '황칠 전용 파우치 커터 2개 + 고급 선물 쇼핑백 증정 + 무료배송'
    },
    sam: {
      name: '황칠삼 1박스 (100ml x 50포)',
      originalPrice: 160000,
      salePrice: 109000,
      discountPercent: 32,
      bonus: '황칠 전용 파우치 커터 증정 + 무료배송'
    },
    moon: {
      name: '황칠문 1박스 (100ml x 50포)',
      originalPrice: 160000,
      salePrice: 109000,
      discountPercent: 32,
      bonus: '황칠 전용 파우치 커터 증정 + 무료배송'
    }
  };

  let currentSelectedProduct = 'both';
  let currentQuantity = 1;

  const productLabels = document.querySelectorAll('.product-select-label');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const qtyDisplay = document.getElementById('qtyDisplay');
  const summaryProductName = document.getElementById('summaryProductName');
  const summaryUnitOriginal = document.getElementById('summaryUnitOriginal');
  const summaryUnitSale = document.getElementById('summaryUnitSale');
  const summaryDiscountTotal = document.getElementById('summaryDiscountTotal');
  const summaryTotalPrice = document.getElementById('summaryTotalPrice');
  const summaryBonusText = document.getElementById('summaryBonusText');
  const floatingPrice = document.getElementById('floatingPrice');
  const floatingProductLabel = document.getElementById('floatingProductLabel');

  function updatePricing() {
    const data = productOptions[currentSelectedProduct];
    const totalOriginal = data.originalPrice * currentQuantity;
    const totalSale = data.salePrice * currentQuantity;
    const totalDiscount = totalOriginal - totalSale;

    if (qtyDisplay) qtyDisplay.textContent = currentQuantity;
    if (summaryProductName) summaryProductName.textContent = `${data.name} × ${currentQuantity}개`;
    if (summaryUnitOriginal) summaryUnitOriginal.textContent = `${totalOriginal.toLocaleString()}원`;
    if (summaryUnitSale) summaryUnitSale.textContent = `${totalSale.toLocaleString()}원`;
    if (summaryDiscountTotal) summaryDiscountTotal.textContent = `-${totalDiscount.toLocaleString()}원 (${data.discountPercent}% OFF)`;
    if (summaryTotalPrice) summaryTotalPrice.textContent = `${totalSale.toLocaleString()}원`;
    if (summaryBonusText) summaryBonusText.textContent = data.bonus;

    if (floatingPrice) floatingPrice.textContent = `${totalSale.toLocaleString()}원`;
    if (floatingProductLabel) floatingProductLabel.textContent = data.name.split('(')[0].trim();
  }

  function selectProductOption(key) {
    currentSelectedProduct = key;
    productLabels.forEach(label => {
      if (label.dataset.product === key) {
        label.classList.add('selected');
      } else {
        label.classList.remove('selected');
      }
    });
    updatePricing();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  productLabels.forEach(label => {
    label.addEventListener('click', () => {
      const prod = label.dataset.product;
      selectProductOption(prod);
    });
  });

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (currentQuantity > 1) {
        currentQuantity--;
        updatePricing();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      if (currentQuantity < 10) {
        currentQuantity++;
        updatePricing();
      }
    });
  }

  updatePricing();

  // 7. 자주 묻는 질문 FAQ 아코디언 토글
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-question');
    if (q) {
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // 8. 전화 상담 바로가기 지원
  const callButtons = document.querySelectorAll('a[href^="tel:"]');
  callButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Direct phone consultation initiated: 061-843-1677');
    });
  });
});
