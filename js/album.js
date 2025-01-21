const data = [
  {
    date: '2024-12-30',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/23181135224365781/93ACA4A8D5C99D157DDCFEF2E8E15B7D0D08867D/',
    link: '',
    title: '',
    tags: ['动画']
  },
  {
    date: '2024-05-20',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/23181135224366647/23AB13DBD9E130B3CF2B5F8203DA6E7AE54E363D/',
    link: '',
    title: '',
    tags: ['恋爱']
  },
  {
    date: '2023-12-30',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2307596441975925728/F4A6BB8640753D54AF02E66F965CB4455A30B83F/',
    link: '',
    title: '',
    tags: ['动画']
  },
  {
    date: '2023-05-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2308724878073368139/EDA407E9C34300BE0E64AF4C434446417B885676/',
    link: '',
    title: '塞尔达传说 王国之泪',
    tags: ['游戏']
  },
  {
    date: '2023-05-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2308724878073368515/FD8CE8076057FBC3C3A582455268FC95A7FA97E6/',
    link: '',
    title: '塞尔达传说 王国之泪',
    tags: ['游戏']
  },
  {
    date: '2023-05-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2308724878073366290/5E80A839432D80EA525E56F889C1E6EB31B21209/',
    link: '',
    title: '塞尔达传说 王国之泪',
    tags: ['游戏']
  },
  {
    date: '2023-05-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2308724878073365129/71CE838FF5EE9B7455E99E8C81001531C580A1A0/',
    link: '',
    title: '塞尔达传说 王国之泪',
    tags: ['游戏']
  },
  {
    date: '2023-05-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2308724878073365523/AD37BE6C3A9C775A6B01A64AEADB230656FFE7A8/',
    link: '',
    title: '塞尔达传说 王国之泪',
    tags: ['游戏']
  },
  {
    date: '2023-05-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2308724878073365908/58F57F9B3C63E051865448559D45F4DB840250C7/',
    link: '',
    title: '塞尔达传说 王国之泪',
    tags: ['游戏']
  },
  {
    date: '2023-05-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2308724878073363679/171BAB50419A8B598331E19BD41AF5E10B3657B4/',
    link: '',
    title: '塞尔达传说 旷野之息',
    tags: ['游戏']
  },
  {
    date: '2023-05-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2308724878073362748/58C1877B965ACAEEF3F354EC78BF6B178BE3456D/',
    link: '',
    title: '超级马力欧 奥德赛',
    tags: ['游戏']
  },
  {
    date: '2023-05-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2308724878073362217/260468CCD33F04A7385E022C1BF3AA5534DAA630/',
    link: '',
    title: 'switch',
    tags: ['游戏']
  },
  {
    date: '2023-02-25',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134661856/3B9CEDD5AF430C41D1C0855C1EDE83CCB5CF05E9/',
    link: 'https://www.hpoi.net/hobby/51330',
    title: '碧蓝航线 绫波～鬼神华裳～',
    tags: ['手办']
  },
  {
    date: '2023-02-25',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134661452/CE5C8B2108E484080A1C63E51EFAD2B73DD09B68/',
    link: 'https://www.hpoi.net/hobby/51330',
    title: '碧蓝航线 绫波～鬼神华裳～',
    tags: ['手办']
  },
  {
    date: '2023-02-25',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134661706/7E395463ABA2F7BE4DAA9F2C824B7A3BC448A03D/',
    link: 'https://www.hpoi.net/hobby/51330',
    title: '碧蓝航线 绫波～鬼神华裳～',
    tags: ['手办']
  },
  {
    date: '2022-09-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/5098669332594218286/E4C5487D725C754E58EF4EFFDA1C3706FE5C86EE/',
    link: 'https://book.douban.com/subject/35541211/',
    title: '《共产党宣言》',
    tags: ['书籍']
  },
  {
    date: '2022-09-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/5098669332594218422/73EC594F0A05E3EDF35E5D79E70D5C3D9E25910D/',
    link: 'https://book.douban.com/subject/19952164/',
    title: '《列宁选集》',
    tags: ['书籍']
  },
  {
    date: '2022-09-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134516914/D3FBF376EE3AEF6F2A7ABBF4DDF930C652D11264/',
    link: 'https://book.douban.com/subject/1139360/',
    title: '《毛泽东选集》',
    tags: ['书籍']
  },
  {
    date: '2022-09-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134516742/28A32A7B51C2ADED07A7B198095F224463795CF8/',
    link: 'https://book.douban.com/subject/1013502/',
    title: '《钢铁是怎样炼成的》',
    tags: ['书籍']
  },
  {
    date: '2022-06-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/5098669332594558720/CC362DB7EEAADF3490F1C28E752F366FB816CEE8/',
    link: 'https://bgm.tv/subject/355774',
    title: '《冴えない彼女の育てかた 深崎暮人画集 下 Fine.》',
    tags: ['书籍']
  },
  {
    date: '2022-06-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/5098669332594550250/BDCE83367B774CF05B60EE0C4757636FFB56381C/',
    link: 'https://bgm.tv/subject/355774',
    title: '《冴えない彼女の育てかた 深崎暮人画集 下 Fine.》',
    tags: ['书籍']
  },
  {
    date: '2022-06-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/5098669332594550400/5D6889A7C6D0D00AE5F8055AD0885AD4143E7205/',
    link: 'https://bgm.tv/subject/139827',
    title: '《SQ从你的名字开始》',
    tags: ['书籍']
  },
  {
    date: '2022-05-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134516186/47B41A8909AB3622E3401D4B3F03D1D744CF1AAE/',
    link: 'https://book.douban.com/subject/2567698/',
    title: '《三体》',
    tags: ['书籍']
  },
  {
    date: '2022-05-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134516375/AF73C3FC69FD9F44A71258BE2312AF98CC5076D1/',
    link: 'https://book.douban.com/subject/3066477/',
    title: '《三体Ⅱ》',
    tags: ['书籍']
  },
  {
    date: '2022-05-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134516594/DF17DD13F6B2B27816E9EE2F2CE8FA40009FA03D/',
    link: 'https://book.douban.com/subject/5363767/',
    title: '《三体Ⅲ》',
    tags: ['书籍']
  },
  {
    date: '2022-12-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/5098669332621157137/767ED529E2800AF456070D7D39ED49FF5032CFCF/',
    link: 'https://github.com/jellyfin/jellyfin',
    title: 'jellyfin',
    tags: ['动画', '软件']
  },
  {
    date: '2022-12-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/5098669332594386160/BD35D7BD70E747C69D820473542F552A51FA8680/',
    link: 'https://store.epicgames.com/en-US/p/god-of-war',
    title: '《战神4》',
    tags: ['游戏']
  },
  {
    date: '2022-12-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/5098669332594386010/AF122E79D894A37E00784CF123DA21A9707BD3B6/',
    link: 'https://store.steampowered.com/app/1222700/A_Way_Out/',
    title: '《逃出升天》',
    tags: ['游戏']
  },
  {
    date: '2021-12-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/1824519425766048451/942311AB01D3432FB750C69FB32D06DFD868C5A3/',
    link: '',
    title: '北京·魔卡少女樱展-被施下魔法的美术馆',
    tags: ['旅行']
  },
  {
    date: '2021-12-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134649000/21021F6F97C30011B78C8E631C002C5A43B3160E/',
    link: '',
    title: '双彩虹',
    tags: ['旅行']
  },
  {
    date: '2021-12-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134648444/826F35881C7D232AEB20AFB977C59B43C1751451/',
    link: '',
    title: '云海',
    tags: ['旅行']
  },
  {
    date: '2021-12-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/1824519425765910948/16B9D8B3E9A39AC4B4CC7CEBEDD519F032FD1F1C/',
    link: 'https://bgm.tv/subject/326607',
    title: '《冴えない彼女の育てかた 深崎暮人画集 上 Flat.》',
    tags: ['书籍']
  },
  {
    date: '2021-12-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/1824519425765911222/7747ACB58C95550F7289A7FE5D145C28D332926D/',
    link: 'https://bgm.tv/subject/326607',
    title: '《冴えない彼女の育てかた 深崎暮人画集 上 Flat.》',
    tags: ['书籍']
  },
  {
    date: '2021-12-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/1824519425765908119/76CB1EA7F112D32222B74188CBAFEF102042C424/',
    link: 'https://bgm.tv/subject/326607',
    title: '《冴えない彼女の育てかた 深崎暮人画集 上 Flat.》',
    tags: ['书籍']
  },
  {
    date: '2021-12-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/1824519425765910611/54A0C2DE3EB46AA634DCEC6EAAD2619D2D5DD521/',
    link: 'https://bgm.tv/subject/342254',
    title: '《ルックバック》',
    tags: ['书籍']
  },
  {
    date: '2021-12-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/1824519657656819312/40D4744E67E5CB3CBFEE4138781BB955F8EC7737/',
    link: 'https://bgm.tv/subject/308947',
    title: '《双人成行》',
    tags: ['游戏']
  },
  {
    date: '2021-12-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/1824519657656796714/028A5EDDFA7A1CD1B4AA5351E143D6A3F9864E4F/',
    link: 'https://bgm.tv/subject/308947',
    title: '《双人成行》',
    tags: ['游戏']
  },
  {
    date: '2020-01-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/1458554474724166866/7AB6A4DE394156A869135BFBD88D7ABE4C7CC1D1/',
    link: 'https://bgm.tv/subject/80838',
    title: '桜Trick',
    tags: ['动画']
  },
  {
    date: '2020-01-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/1647721029645249408/077A3C32C890CA4C0B2F27D9EF6C198B199DABC7/',
    link: 'https://beats0.github.io/2021/01/02/2020/#%E4%B9%A6',
    title: '《小百合さんの妹は天使》',
    tags: ['书籍']
  },
  {
    date: '2020-01-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134649902/A58EFF33CC228589A47BDBE925141FC51DF3C1A5/',
    link: 'https://beats0.github.io/2021/01/02/2020/#%E4%B9%A6',
    title: '《GHOST IN THE SHELL / 攻殻機動隊 原画集 -Archives- 》',
    tags: ['书籍']
  },
  {
    date: '2020-01-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/1647721029645248286/404091EBDC6A646D65570E5D1E3B4C8B3ED4A83C/',
    link: 'https://beats0.github.io/2021/01/02/2020/#%E4%B9%A6',
    title: '《GHOST IN THE SHELL / 攻殻機動隊 原画集 -Archives- 》',
    tags: ['书籍']
  },
  {
    date: '2020-01-02',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/1647721029645249103/0A80E7D057E9B5F809A5C3B749CDF1970DF6E9E5/',
    link: 'https://beats0.github.io/2021/01/02/2020/#%E4%B9%A6',
    title: '《狗神煌Artworks 猫毒Parade》、《サクラノ詩 -櫻の森の上を舞う- 公式ビジュアルアーカイヴ》',
    tags: ['书籍']
  },
  {
    date: '2019-06-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134648815/2503675A9778A9219BFAC00280AFE1BA243B7E4B/',
    link: '',
    title: '',
    tags: ['吃的']
  },
  {
    date: '2019-06-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134648664/5C90A2D36BDB51C2A39D2DCB3BBF4E1424801465/',
    link: '',
    title: '',
    tags: ['吃的']
  },
  {
    date: '2019-06-01',
    img: 'https://steamuserimages-a.akamaihd.net/ugc/2067758829134649740/97ACDDB127639CAF24A6B3CCDFF42B1C4DCB4ED7/',
    link: '',
    title: '',
    tags: ['吃的']
  },
]

let activeTag = ''

function renderTags(data = []) {
  if(window.location.href.indexOf('?') !== -1) {
    const urlParserData = urlParser(window.location.href)
    if (urlParserData.tag) {
      activeTag = decodeURIComponent(urlParserData.tag)
    }
  }
  data.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
  let tagsObj = {}
  let arr = []
  for (let i = 0; i < data.length; i++) {
    const { tags } = data[i]
    tags.forEach(t => {
      tagsObj.hasOwnProperty(t) ? tagsObj[t] += 1 : tagsObj[t] = 1
    })
  }
  for (let key in tagsObj) {
    arr.push({ label: key, value: tagsObj[key] })
  }
  arr.sort((a, b) => {
    return b.value - a.value
  })

  let t = `<a class="tag-button--all" data-encode=""> Show All <sup>${data.length}</sup></a>`
  arr.forEach((item, index) => {
    t += `
           <a data-sort="${index}" data-encode="${item.label}" class="tag-button ${activeTag === item.label ? 'focus' : ''}" title="${item.label}" rel="${item.value}" style="background-color: rgb(187, 187, 238);"> ${item.label} <sup>${item.value}</sup></a>
      `
  })
  document.querySelector('#tag_cloud').innerHTML = t
}

function renderAlbum(_data=[]) {
  let data = JSON.parse(JSON.stringify(_data))
  if(activeTag) {
    data = data.filter(item => item.tags.includes(activeTag))
  }
  if(data.length === 0) return

  const startTime = data[data.length-1].date
  const endTime = data[0].date
  const timeMonthArr = getDurDateList(startTime, endTime).reverse()

  let h = ``
  timeMonthArr.forEach(ym => {
    const mData = getDataByMonth(data, ym)
    if(mData.length) {
      h += genAlbumStr(mData, ym)
    }
  })
  document.querySelector('.albumList').innerHTML = h
}

function getDataByMonth(data, m) {
  return data.filter(item => dayjs(item.date).format('YYYY-M') === m)
}

function genAlbumStr(data=[], ym) {
  const cy = dayjs().get('year')
  const y = dayjs(ym).get('year')
  const m = dayjs(ym).get('month')+1
  let t = ``
  data.forEach(item => {
    t += `
      <div class="albumItemBlock">
        <div class="albumItemBlockInner">
          <img src="${item.img}" class="albumItemImg lazyload" alt="${item.title}" title="${item.title}" data-link="${item.link}">
        </div>
      </div>
      `
  })
  const h = `<div class="albumItem">
          <div class="albumDate">
            <div class="albumM">${m}月</div>
            <div class="albumY">${cy === y ? '' : y}</div>
          </div>
          <div class="albumItemFlex">${t}</div></div>`
  return h
}

function getDurDateList (start, end) {
  let startDate = dayjs(start).startOf('month')
  let endDate = dayjs(end).startOf('month')
  let diffMonth = endDate.diff(startDate, 'month')
  let dateList = []
  for (let i = 0; i <= diffMonth; i++) {
    let currentD = startDate.add(i, 'month')
    const t = currentD.startOf('month').format('YYYY-M')
    dateList.push(t)
  }
  return dateList
}

function urlParser(url){
  let arr = url.split('?');
  let res = arr[1].split('&');
  let items = {};
  for(let i=0;i<res.length;i++){
    let a = res[i].split('=');
    items[a[0]] = a[1];
  }
  return items
}

const setUrlQuery = (function() {
  const baseUrl =  window.location.href.split('?')[0];
  return function(query) {
    if (typeof query === 'string') {
      window.history.replaceState(null, '', baseUrl + query);
    } else {
      window.history.replaceState(null, '', baseUrl);
    }
  };
})();

function initRender() {
  renderTags(data)
  renderAlbum(data)
  document.querySelectorAll('.albumList img').forEach(el => {
    el.setAttribute('data-action', 'zoom')
  })
}
initRender()


let $tags = document.querySelector('.js-tags');
$tags.addEventListener('click', function(event) {
  let target = event.target
  while(target.nodeName.toLowerCase() !== 'a'){
    target = target.parentNode
  }
  activeTag = target.getAttribute('data-encode')
  if(activeTag) {
    setUrlQuery('?tag=' + activeTag);
    initRender()
  } else {
    setUrlQuery();
    initRender()
  }
});
