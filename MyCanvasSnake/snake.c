#include <windows.h>
#include <time.h>	// библиотека, нужна для использования функции Sleep()
#include <conio.h>	// библиотека, нужна для использования функций kbhit() и getch()
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
using namespace std;

#define W 15				// ширина x
#define H 10				// высота y
#define SIZE W*H
#define INFO 0
#define BOT 0
#define INTERVAL 200	// интервал в миллисекундах
#define FOOD 3
#define HEAD 206		// знак для тела змейки
#define VER 186
#define GOR 205
#define UPLEFT 201
#define UPRIGHT 187
#define DOWNLEFT 200
#define DOWNRIGHT 188
#define ABS(a) (a)!=HEAD&&(a)!=VER&&(a)!=GOR&&(a)!=UPLEFT&&(a)!=UPRIGHT&&(a)!=DOWNLEFT&&(a)!=DOWNRIGHT
#define SBA(a) (a)==HEAD||(a)==VER||(a)==GOR||(a)==UPLEFT||(a)==UPRIGHT||(a)==DOWNLEFT||(a)==DOWNRIGHT
#define SPACE 32			// знак для пустоты
#define PRICE 2				// цена еды
#define PI 3.14159265358979323846f

/*  snake_size - размер змейки
	max_size - максимальный размер змейки
	change_x, change_y - в какую сторону движется змейка
	coordinates_x[1000], coordinates_y[1000] - массивы, хранящие координаты частей тела змейки
	food_x, food_y - координаты еды
	coordinates_x[1], coordinates_y[1] - координаты головы змейки	
	symbol - хранит в себе ASCII код нажатой клавиши
	a[1000][1000] - наша таблица, в которой происходит вся игра	*/
	
int info, bot, snake_size, max_size, change_x, change_y, coordinates_x[SIZE+PRICE], coordinates_y[SIZE+PRICE], food_x = -1, food_y = -1;
unsigned char symbol, a[SIZE+PRICE][SIZE+PRICE] = {}, snake_body[SIZE+PRICE] = {};
int xeh, yeh;
int b[H+1][W+1]={};
// Функция генерации случайного числа от мин до мах
int randn(int min, int max) {	return rand() % (max - min + 1) + min; }
int key = 0;

int direct;
int direct0;
int test = -1;
float test2 = 0;
float test3[W * H] = {};
char test4[W * H][50];
int change[2];

#define WALL -1         // непроходимая ячейка
#define BLANK -2         // свободная непомеченная ячейка

int px[W * H], py[W * H];      // координаты ячеек, входящих в путь
int len;                       // длина пути
int grid[H+1][W+1];                // рабочее поле

// Перед вызовом lee() массив grid заполнен значениями WALL и BLANK

bool lee(int ax, int ay, int bx, int by)   // поиск пути из ячейки (ax, ay) в ячейку (bx, by)
{
  int dx[4] = {1, 0, -1, 0};   // смещения, соответствующие соседям ячейки
  int dy[4] = {0, 1, 0, -1};   // справа, снизу, слева и сверху
  int d, x, y, k;
  bool stop;

  if (grid[ay][ax] == WALL || grid[by][bx] == WALL) return false;  // ячейка (ax, ay) или (bx, by) - стена

  // распространение волны
  d = 0;
  grid[ay][ax] = 0;            // стартовая ячейка помечена 0
  do {
    stop = true;               // предполагаем, что все свободные клетки уже помечены
    for ( y = 0; y <= H; ++y )
      for ( x = 0; x <= W; ++x )
        if ( grid[y][x] == d )                         // ячейка (x, y) помечена числом d
        {
          for ( k = 0; k < 4; ++k )                    // проходим по всем непомеченным соседям
          {
             int iy=y + dy[k], ix = x + dx[k];
			 // круговой поиск
			 if(iy < 1) iy = H;
			 if(iy > H) iy = 1;
			 if(ix < 1) ix = W;
			 if(ix > W) ix = 1;
			 
             if ( iy >= 0 && iy <= H && ix >= 0 && ix <= W && grid[iy][ix] == BLANK )
             {
                stop = false;              // найдены непомеченные клетки
                grid[iy][ix] = d + 1;      // распространяем волну
             }
          }
        }
    d++;
  } while ( !stop && grid[by][bx] == BLANK );

  if (grid[by][bx] == BLANK) return false;  // путь не найден

  // восстановление пути
  len = grid[by][bx];            // длина кратчайшего пути из (ax, ay) в (bx, by)
  x = bx;
  y = by;
  d = len;
  while ( d > 0 )
  {
    px[d] = x;
    py[d] = y;                   // записываем ячейку (x, y) в путь
    d--;
    for (k = 0; k < 4; ++k)
    {
       int iy=y + dy[k], ix = x + dx[k];
	    // круговой поиск
		if(iy < 1) iy = H;
		if(iy > H) iy = 1;
		if(ix < 1) ix = W;
		if(ix > W) ix = 1;
		sprintf(test4[k],"iy = %d, ix = %d, grid[iy][ix] = %d, d = %d \n", iy, ix, grid[iy][ix], d);
       if ( iy >= 0 && iy <= H && ix >= 0 && ix <= W && grid[iy][ix] == d)
      {
        x = x + dx[k];
        y = y + dy[k];           // переходим в ячейку, которая на 1 ближе к старту
		if(y < 1) y = H;
		if(y > H) y = 1;
		if(x < 1) x = W;
		if(x > W) x = 1;
        break;
      }
    }
  }
  px[0] = ax;
  py[0] = ay;                    // теперь px[0..len] и py[0..len] - координаты ячеек пути
  return true;
}

void change_coord(int coord)
{
	switch(coord)
	{
		case 0:if(change_x != -1) 	{change_x = 1; change_y = 0; direct = 0;} break; 	// вправо
		case 1:if(change_y != -1) 	{change_x = 0; change_y = 1; direct = 1;} break; 	// вниз
		case 2:if(change_x != 1) 	{change_x = -1; change_y = 0; direct = 2;} break;	// влево
		case 3:if(change_y != 1) 	{change_x = 0; change_y = -1; direct = 3;} break; 	// вверх
		default : break; 
	}
}

void autobot()
{
	int dx[4] = {1, 0, -1, 0};   // смещения, соответствующие соседям ячейки
	int dy[4] = {0, 1, 0, -1};   // справа, снизу, слева и сверху
	for (int i = 0; i <= H; ++i)
		for (int j = 0; j <= W; ++j)
			b[i][j] = 0;
	if(lee(coordinates_x[1],coordinates_y[1],food_x,food_y))
	{
		for (int i = 0; i <= len; ++i)
			b[py[i]][px[i]] = 1;

		for (int k = 0; k < 4; ++k )
		{
			int iy = coordinates_y[1]+dy[k], ix = coordinates_x[1]+dx[k];
			// круговой поиск
			if(iy < 1) iy = H;
			if(iy > H) iy = 1;
			if(ix < 1) ix = W;
			if(ix > W) ix = 1;
		
			if(b[iy][ix])
			{
				test = k;
				change_coord(k);
				return;
			}
		}
	}
	else
	{
		for (int k = 0;k < 4; ++k )
		{
			int x = coordinates_x[1]+dx[k];
			int y = coordinates_y[1]+dy[k];

			if (x < 1) x = W;
			if (x > W) x = 1;
			if (y < 1) y = H;
			if (y > H) y = 1;
			sprintf(test4[k],"a[y][x] = [%d], x = %d, y = %d", a[y][x], x, y);
			if(ABS(a[y][x]))
			{
				test = k;
				change_coord(k);
			}
		}
	}
}	

void change_direction()	// функция, считывающая нажатую клавишу
{
	symbol = getch();	// считываем нажатую клавишу с помощью функции getch()
	switch (symbol)
	{												// управление змейкой у нас через wasd
		case 'd': if(change_x != -1) 	{change_x = 1; change_y = 0; direct = 0;} break; // вправо
		case 's': if(change_y != -1) 	{change_x = 0; change_y = 1; direct = 1;} break; // вниз
		case 'a': if(change_x != 1) 	{change_x = -1; change_y = 0; direct = 2;} break;	// влево
		case 'w': if(change_y != 1) 	{change_x = 0; change_y = -1; direct = 3;} break; // вверх
		case 'q': bot = bot ? 0 : 1; break;
		case 'e': info = info ? 0 : 1; break;
		case 'z': exit(0); break;
		case 32 : system("pause");	break;	// если нажат пробел, то выход
		default : break; 
	}
}

void nullconsole(int x, int y)
{
	HANDLE consoleOutput;
	COORD cursorPos;									// Получаем хэндл консоли 
	consoleOutput = GetStdHandle(STD_OUTPUT_HANDLE);	// Задаем координаты курсора и перемещаем курсор
	cursorPos.X = x;
	cursorPos.Y = y;
	SetConsoleCursorPosition(consoleOutput, cursorPos);
}

void show_table()									// функция для вывода таблицы
{
	HANDLE consoleOutput;
	consoleOutput = GetStdHandle(STD_OUTPUT_HANDLE);
	nullconsole(0,0);									// очищаем консоль
	SetConsoleTextAttribute(consoleOutput, FOREGROUND_GREEN);
	/*if(INFO)
	{
		printf("%3.d\n", food_x);
		printf("%3.d\n", food_y);
		for (int i = 0; i <= H; i++)
		{
			for (int j = 0; j <= W; j++)
			{
				printf("%2.d", b[i][j]);	
			}
			puts("");
		}
		puts("");
		for (int i = 0; i <= H; i++)
		{
			for (int j = 0; j <= W; j++)
			{
				printf("%3.d", grid[i][j]);	
			}
			puts("");
		}
	}*/
	for (int i = 0; i <= H + 1; ++i)				// выводим таблицу
	{
		for (int j = 0; j <= W + 1; ++j)
		{
			if(i==0&&j==0)
			{
				putchar(177);
				continue;
			} 
			if(SBA(a[i][j]))
			{
				SetConsoleTextAttribute(consoleOutput, FOREGROUND_BLUE | FOREGROUND_INTENSITY);
				putchar(a[i][j]);
				continue;
			}
			else if(a[i][j]==FOOD)
			{
				SetConsoleTextAttribute(consoleOutput, FOREGROUND_RED | FOREGROUND_INTENSITY);
				putchar(a[i][j]);
				continue;
			}
			else
			{
				SetConsoleTextAttribute(consoleOutput, FOREGROUND_GREEN);
				putchar(a[i][j]);
				continue;
			}
		}
		puts("");
	}
	SetConsoleTextAttribute(consoleOutput, FOREGROUND_RED | FOREGROUND_INTENSITY);
	printf("Snake size: %d   \n", snake_size);
	if(info)
	{
		printf("key: %c \n", symbol);
		const char *text0[15];
		text0[15] = direct == 0 ? "right" : direct == 1 ? "down" : direct == 2 ? "left" : direct == 3 ? "up" : "err";
		printf("direct: %d:%s   \n",  direct, text0[15]);
		printf("change_x = %d change_y = %d	 \n", change_x, change_y);
		printf("head_x = %d head_y = %d	 \n", coordinates_x[1], coordinates_y[1]);
		if(bot)
		{
			printf("dist = %d   \n",grid[food_y][food_x]-1);
			const char *text[15];
			text[15] = test == 0 ? "right" : test == 1 ? "down" : test == 2 ? "left" : test == 3 ? "up" : "err";
			printf("test = %s	\n", text[15]);
		}
		//for(int i=0;i<4;i++) {printf("%d) %s \n",i,test4[i]); sprintf(test4[i],"                               ");}
		if(a[coordinates_y[1]+change_y][coordinates_x[1]+change_x]!=SPACE) puts("#");	else puts(" ");
		if(bot) puts("*");	else puts(" ");
		/*printf("if(change_y(%d) != -1) if(change_y(%d) != -1)", change[0], change[1]);*/
		//for(int i=0;i<len;i++) printf("x=%d,y=%d\n",px[i],py[i]);
	}
	SetConsoleTextAttribute(consoleOutput, FOREGROUND_GREEN);
}
void clear_snake_on_table()							// очищаем координаты, в которых располагалась змейка
{
	for (int i = 1; i <= max_size; ++i)
		if(a[coordinates_y[i]][coordinates_x[i]]!=177) a[coordinates_y[i]][coordinates_x[i]] = SPACE;
}
void show_snake_on_table()	// красим координаты змейки
{
	for (int i = snake_size; i >= 3; --i)
		snake_body[i] = snake_body[i-1];
	
	if(direct0 == 0 && direct == 0 || direct0 == 2 && direct == 2) snake_body[2] = GOR;
	if(direct0 == 3 && direct == 3 || direct0 == 1 && direct == 1) snake_body[2] = VER;
	if(direct0 == 0 && direct == 1 || direct0 == 3 && direct == 2) snake_body[2] = UPRIGHT;
	if(direct0 == 1 && direct == 0 || direct0 == 2 && direct == 3) snake_body[2] = DOWNLEFT;
	if(direct0 == 1 && direct == 2 || direct0 == 0 && direct == 3) snake_body[2] = DOWNRIGHT;
	if(direct0 == 2 && direct == 1 || direct0 == 3 && direct == 0) snake_body[2] = UPLEFT;
	direct0 = direct;
	
	for (int i = 1; i <= snake_size; ++i)
	{	
		if(!coordinates_y[i] && !coordinates_x[i]) continue;
		a[coordinates_y[i]][coordinates_x[i]] = snake_body[i];		// красим змейку
	}
}
bool game_over()											// проверяем, съела ли змейка саму себя
{
	for (int i = 2; i <= snake_size; ++i)
		if (coordinates_y[1] == coordinates_y[i] && coordinates_x[1] == coordinates_x[i])
		{	
			snake_size = i;
			return true;
		}
	// если координаты головы змейки равны координате какой-либо части тела змейки, то змейка съела саму себя
	return false;										// если все координаты различны, то все в порядке - играем дальше
}
void check_coordinates()								// проверяем, не вышла ли змейка за поле, если да то возвращаем ее обратно
{
	if (coordinates_x[1] > W) coordinates_x[1] = 1;
	if (coordinates_x[1] < 1) coordinates_x[1] = W;
	if (coordinates_y[1] > H) coordinates_y[1] = 1;
	if (coordinates_y[1] < 1) coordinates_y[1] = H;
}
void next_step()										// функция следующего хода, в которой наша змейка сдвигается в сторону на 1 ячейку
{
	clear_snake_on_table();							// чистим таблицу от змейки
 
	for (int i = snake_size; i >= 2; --i)				// передвигаем тело змейки
	{
		coordinates_x[i] = coordinates_x[i - 1];
		coordinates_y[i] = coordinates_y[i - 1];
	}

	for (int i = snake_size; i < max_size; i++)			// передвигаем тело змейки
	{
		coordinates_x[i] = SPACE;
		coordinates_y[i] = SPACE;
	}
	
	coordinates_x[1] += change_x;						// передвигаем голову змейки
	coordinates_y[1] += change_y;
	
	check_coordinates();								// проверяем в порядке ли координаты
														// если голова змейки там же где и еда, то увеличиваем размер змейки и очищаем координаты змейки
	if(coordinates_x[1] == food_x && coordinates_y[1] == food_y)
	{
		snake_size+=PRICE;
		food_x = -1;
		food_y = -1;
	}

	show_snake_on_table();								// рисуем змейку
 
	if (game_over() == true)							// если змея укусила себя
	{
		/*snake_size--;
		cout << "You're looser! \n";					// сообщаем всю правду о игроке
		system("pause");								// приостанавливаем игру
		exit(0);*/										// завершаем программу
	}
	
	max_size = snake_size > max_size ? snake_size : max_size;
	
	if (snake_size >= W*H-1)							// если змея очень большая
	{
		puts("You Win!");
		system("pause");								// приостанавливаем игру
		exit(0);										// завершаем программу
	}
}
bool food_check()										// функция проверки на наличие еды на карте
{
	if(food_x == -1 && food_y == -1) return false;		// если координаты еды неопределенны то возвращаем true
	return true;										// в остальных случаях false
}
void place_food()										// функция добавления еды на карту
{
	while(1)											// ставим в рандомное место еду
	{
		int x = randn(1,W);
		int y = randn(1,H);
		if(ABS(a[y][x]))
		{
			food_x = x;
			food_y = y;
			a[y][x] = FOOD;
			return;
		}
	}
}
void standart_settings()								// начальные установки
{
	for (int i = 0; i <= H + 1; ++i)					// рисуем края
		for (int j = 0; j <= W + 1; ++j) 
		{
			if(i == 0 || j == 0 || i == H + 1 || j == W + 1) a[i][j] = 177;
			else a[i][j] = SPACE;
		}
		
	snake_size = 2;									// размер змеи - 2
	max_size = snake_size;
	bot = BOT;
	info = INFO;
 
	coordinates_x[1] = 2;
	coordinates_y[1] = 1;
	coordinates_x[2] = 1;
	coordinates_y[2] = 1;								// змейка занимает две клетки вправо от координаты {1,1}
	
	snake_body[1] = HEAD;
	snake_body[2] = GOR;
	
	direct = 0;
	direct0 = 0;
	change_x = 1;
	change_y = 0;										// змейка движется вправо
}

void BestFirstFinder()
{
	for (int i = 0; i <= H; ++i)
		for (int j = 0; j <= W; ++j)
		{
		if(	SBA(a[i][j])||i==0||j==0) 
				{
					grid[i][j] = -1;
					if(coordinates_y[1]==i&&coordinates_x[1]==j) 	grid[i][j] = -2;
				}
			else grid[i][j] = -2;
		}
}
int main ()
{
	srand(time(NULL));
	standart_settings();								// задаем стандартные настройки
	system("cls");
	while (1)										// бесконечный цикл
	{
		if(kbhit()) change_direction();						// если нажата клавиша обрабатываем нажатую клавишу
		if(bot)
		{
			BestFirstFinder();
			autobot();
		}

		next_step();									// двигаем змейку
 
		if(!food_check())
		{
			place_food();									// если нет еды, то ставим ее
		}
		
		/*nullconsole(35,7);
		printf("%d   ", snake_size);*/
		
		show_table();									// рисуем змейку
 
		Sleep(INTERVAL);								// "усыпляем" программу на заданный интервал
	}
}