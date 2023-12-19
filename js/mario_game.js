const mario = document.querySelector('.mario'); /* Pega a classe 'mario' lá do HTML */
const pipe = document.querySelector('.pipe'); /* Pega a classe 'pipe' lá no HTML */
const score = document.querySelector('.score');
const game_over = document.querySelector('.game_over');
const clouds = document.querySelector('.clouds');
const restart = document.querySelector('.restart');

restart.style.visibility = 'hidden'; /* Deixa o botão "restart" escondido */
game_over.style.visibility = 'hidden';

let cont = 0;
let intervalID;

contar();

const jump = ()	=> 
{
	mario.classList.add('jump');  /* Adiciona a classe 'jump' na classe mario */
	setTimeout(() => 
	{
		mario.classList.remove('jump')
	},500); /* Remove a classe 'jump' da classe mario depois dela acontecer; */
}

const loop = setInterval(() => 
{
	const pipePosition = pipe.offsetLeft;
	const marioPosition = +window.getComputedStyle(mario).bottom.replace('px',''); /* Pega a posição do Mario em qualquer momento da ação, o + converte a posição para número e o replace apaga o 'px' */
	const cloudsPosition = +window.getComputedStyle(clouds).left.replace('px',''); /* Pega a posição das nuvens em qualquer momento da ação, o + converte a posição para número e o replace apaga o 'px' */

	if(pipePosition <= 120 && pipePosition > 0  && marioPosition < 100)
	{
		contar();
		
		pipe.style.animation = 'none'; /* Deixa o pipe sem a animação */
		pipe.style.left = `${pipePosition}px`; /* Deixa o pipe parado onde está */
		clouds.style.animation = 'none';
		clouds.style.left = `${cloudsPosition}px`;
		mario.style.animation = 'none';
		mario.style.bottom = `${marioPosition}px`;
		mario.src = 'images/game-over.png'; /* Substitui o gif do mario pela imagem de game over */
		mario.style.width = '85px'
		mario.style.marginLeft = '35px'

		restart.style.visibility = 'visible'; /* Deixa o botão "restart" visível */	
		game_over.style.visibility = 'visible';	
	}	
}, 10); //A cada 10 ms a const será inicializada

//Essa função é chamada ao iniciar o navegador e quando o Mário morre, em cada caso, o intervalID terá um valor diferente
function contar()
{
	if (intervalID) //Verifica se esse set interval está rodando, se sim, irá parar de rodar ele
	{
		clearInterval(intervalID);
		intervalID = null;
		document.getElementById('score').innerHTML = "Pontos: " + cont;		
	}
	else //Caso o set interval não esteja rodando, começa a rodar
	{
		intervalID = setInterval(() => 
		{
			cont++;
			document.getElementById('score').innerHTML = cont;
		},1500)		
	}
}

document.addEventListener('keydown', jump); //quando qualquer tecla é pressionada, a função jump é acionada

function refresh()
{
	window.location.reload(); /* Dá refresh na página */ 
}