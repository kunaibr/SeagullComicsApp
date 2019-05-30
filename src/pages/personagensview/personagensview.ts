import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-personagensview',
  templateUrl: 'personagensview.html',
})


export class PersonagensviewPage {

  personagens: Array<Object> = [];

  tabs: any = [];

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;

  SwipedTabsIndicator: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.tabs = ['md-snow', 'md-moon', 'md-leaf', 'md-rose', 'md-cog', 'md-planet', 'md-speedometer', 'md-bulb', 'md-magnet'];

    this.personagens = [
      {
        'nome': 'Estrela Fria',
        'imagem':'../../assets/personagens/Estrela.jpg',
        'descricao': 'Estrela fria possui um anel que da poderes de manipular o gelo, mas antes de consegui tal poder as pessoas o consideravam muito um amigo e uma pessoa que ardia inspiração e compaixão, porem agora ele é apenas alguém que só pensa em si mesmo e busca uma resposta sobre esses poderes. O que será que irá acontecer no futuro, ele continuara sendo essa pessoa que era ou se tornara um nova pessoa.',
        'poderes': 'Abaixar a temperatura, congelar o ar, manipular o gelo',
        'armas': 'Anel Magicos, Armas de Fogo uma Pistola e uma picareta de escalador',
        'caracteristicas': 'Kalel Evans é branco com cabelos Loiros e olhos azuis',
      },
      {
        'nome': 'Samurai Lunar',
        'imagem':'../../assets/personagens/Samurai.jpg',
        'descricao': 'Antes de se torna o Samurai Lunar, Hayato akemi era o maior assassino da Yakuza tendo até o posto de comandante da divisão de assassinos, porém ele cai em uma armadilha levando a perder membros do seu corpo, mas com ajuda do Destino ele consegue sobreviver e com agora próteses Robóticas no lugar de seus membros ele luta contra essa organização que um dia ele fez parte e busca descobrir que ele realmente é.',
        'poderes': 'Não tem poderes, mas sabe muito sobre artes marciais',
        'armas': 'Ele utiliza de duas espadas, e braços robótico e pernas e um olho, além disso tem pequenos robôs em seu braços robótico q ele utiliza para vigiar a cidade, e ele possui um equipamento q cria uma plataforma ele tem duas uma q da impulsão melhor e outra q usa só como plataforma para salta, e tem 3 seringas uma vermelha, laranja e verde cada um com efeito diferente',
        'caracteristicas': 'Hayato akemi é branco tem cabelos bem pretos, olhos castanho escuro, uma Tatuagem de um triangulo na nunca ',
      },
      {
        'nome': 'Coruja Prateada',
        'imagem':'../../assets/personagens/Coruja.jpg',
        'descricao': 'Emily Argyle uma renomada pesquisadora que sofre um terrível acidente, que deixa ela incapacitada nos olhos da sociedade, com toda sua vontade, as pessoas verão como uma mulher pode cair muitas vezes e continuar caminhando com seu espirito inabalável.',
        'poderes': 'Habilidade de voar e força consideravelmente aumentada',
        'armas': 'Ela só anda com sua mochila com adesivos de corujas',
        'caracteristicas': 'Emily Argyle é branca, brasileira, cabelos castanho e olhos castanhos claros',
      },
      {
        'nome': 'Mika',
        'imagem':'../../assets/personagens/Mika.jpg',
        'descricao': 'Escolhida pelos deuses contra a sua vontade, Mika Hoyanma — disfarçada sob seu alter ego Samtho —, descobre ser parte de uma profecia, que a cita como protetora de um herói misterioso que chegaria ao planeta. Para protegê-lo, a jovem deve buscar a liberação de seus chakras, para que, assim, consiga seus poderes e possa proteger o herói da profecia e ser a heroína de seu templo.',
        'poderes': 'Dependem do chakra que está usando. Os poderes são: Reflexos aguçados, conexão com o plano astral (espiritual), speech 100 (cada palavra que diz convence qualquer um) o poder da lábia, controle da matéria',
        'armas': 'Utila só suas mãos',
        'caracteristicas': 'Mika é parda de nasceu em Nagarkot - Himalaias com apenas 1,65 metros de altura',
      },
      {
        'nome': 'Gnomo Cinzento',
        'imagem':'../../assets/personagens/Gnomo.jpg',
        'descricao': 'Mark um menino comum que vive sua vida com tranquilidade, exceto o fato dele sofrer um Bullyng constantemente na sua escola, até que ele descobre um herói que pode o ajudar nas situações de sua vida, mas esse não é o único lado da historia que muitas crianças passam, a outros pontos de vista onde o Gnomo Cinzendo ira descobrir junto com Mark.',
        'poderes': 'Trasmutar formas metal apartir de qualquer material que contenha madeira ou plantas',
        'armas': 'Punhos, espadas, machados, maças, armas de fogo, granadas, qualquer material composto de metal etc.',
        'caracteristicas': 'Gnomo é baixo até 1 metro de altura, bem nervoso e cuidadoso com seus poderes.',
      },
      {
        'nome': 'Guardião Eterno',
        'imagem':'../../assets/personagens/Guardiao.jpg',
        'descricao': 'Nenhum ser humano seria capaz de compreender o quão importante é esse ser, com o poder de proteger e harmonizar sistemas solares inteiros, se movimentando nas galaxias esse é um dos Guardiões eternos motivados pela sua missão, porém todo ser tem seu ponto fraco e é nessa historia que se descobre a fraqueza desse herói.',
        'poderes': 'Logo que nascem, os guardiões já têm os poderes de um nivel estelar',
        'armas': 'Utiliza seu manto dos guardiôes',
        'caracteristicas': 'Guardião tem 1,85 metros de altura sua idade é de 637 anos (63 para sua raça) ',
      },
      {
        'nome': 'Marcha 0',
        'imagem':'../../assets/personagens/Marcha.jpeg',
        'descricao': 'Um acidente trágico, um experimento do governo, uma mãe em busca de um filho. A vida de Scott é quebrada em mil pedaços em Marcha 0. Até aonde vale a pena lutar por aquilo que acreditamos?',
        'poderes': ' Velocista, super velocidade, impulso acelerado, força de aceleração, ele tem a capacidade de correr na vertical',
        'armas': 'Traje desenvolvido pelo governo',
        'caracteristicas': 'Marcha 0 tem 25 anos, ele é caucasiano, loiro, e tem olhos castanhos claros',
      },
      {
        'nome': 'Texh',
        'imagem':'../../assets/personagens/Texh.png',
        'descricao': 'Para redimir o passado trágico de sua família, a jovem Tehx iniciará um grande jornada através da luz. Em meio a dúvidas e questionamentos de seu próprio ser, nossa heroína iluminará o caminho de todos que a cercam, mesmo que isso cause danos irreparáveis.',
        'poderes': 'Utilizas seus equipamentos para controlar as propriedades da luz',
        'armas': 'um dispositivo capaz de mudar as propriedads da luz',
        'caracteristicas': 'Texh é uma jovem branca, universitaria, cabelos pretos',
      },
      {
        'nome': 'Onus',
        'imagem':'../../assets/personagens/Onus.jpg',
        'descricao': 'Com braceletes adaptados capazes de emitir força bruta e manipular objetos metálicos, a jornada de Charles Prey é um misto de revolta, revolução e a busca incansável por aquilo que acreditamos. Pessoas pagarão caro por terem despertado a fúria de um homem comum.',
        'poderes': 'ônus não possui nenhum poder paranormal ou extraordinário, a não ser sua orça de vontade e seus braceletes',
        'armas': 'Dois braceletes que contemplam luvas capazes de emitir grande força bruta de impacto. Os mesmos também conseguem magnetizar outros objetos como: Marretas, Canos, Facas, etc..',
        'caracteristicas': 'Onus é um homem negro, alto com 1,90 metros de altura e 102 KG',
      },

    ];

  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
    this.SwipedTabsSlider.slideTo(this.navParams.get("cod"), 0);
  }

  selectTab(index) {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (100 * index) + '%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
    // A condição não pode ser maior que o index
    if (this.SwipedTabsSlider.length() > this.SwipedTabsSlider.getActiveIndex()) {
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (this.SwipedTabsSlider.getActiveIndex() * 100) + '%,0,0)';
    }

  }
  //Animação do indicador 
  animateIndicator($event) {
    if (this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress * (this.SwipedTabsSlider.length() - 1)) * 100) + '%,0,0)';
  }



}


