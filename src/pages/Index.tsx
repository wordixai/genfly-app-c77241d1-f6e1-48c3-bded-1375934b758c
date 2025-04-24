import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/snake.css";

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let speed = 7;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 5, y: 5 };
    let velocityX = 0;
    let velocityY = 0;
    let lastVelocityX = 0;
    let lastVelocityY = 0;
    
    // Generate random food position
    const placeFood = () => {
      food.x = Math.floor(Math.random() * tileCount);
      food.y = Math.floor(Math.random() * tileCount);
      
      // Make sure food doesn't spawn on snake
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === food.x && snake[i].y === food.y) {
          placeFood();
        }
      }
    };
    
    // Game loop
    const gameLoop = () => {
      if (gameOver) return;
      
      // Update snake position
      lastVelocityX = velocityX;
      lastVelocityY = velocityY;
      
      // Move snake
      const head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };
      
      // Check for wall collision
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        setGameOver(true);
        return;
      }
      
      // Check for self collision
      for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          setGameOver(true);
          return;
        }
      }
      
      snake.unshift(head);
      
      // Check for food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prevScore => prevScore + 1);
        placeFood();
        // Increase speed slightly with each food eaten
        if (speed < 15) speed += 0.2;
      } else {
        snake.pop();
      }
      
      // Clear canvas
      ctx.fillStyle = "#333";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw food
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
      
      // Draw snake
      ctx.fillStyle = "#00ff00";
      for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 2, gridSize - 2);
      }
      
      // Draw snake head in a different color
      ctx.fillStyle = "#00cc00";
      ctx.fillRect(snake[0].x * gridSize, snake[0].y * gridSize, gridSize - 2, gridSize - 2);
    };
    
    // Initialize game
    placeFood();
    
    // Set up keyboard controls
    const keyDownHandler = (e: KeyboardEvent) => {
      // Prevent snake from reversing direction
      switch (e.key) {
        case "ArrowUp":
          if (lastVelocityY !== 1) {
            velocityX = 0;
            velocityY = -1;
          }
          break;
        case "ArrowDown":
          if (lastVelocityY !== -1) {
            velocityX = 0;
            velocityY = 1;
          }
          break;
        case "ArrowLeft":
          if (lastVelocityX !== 1) {
            velocityX = -1;
            velocityY = 0;
          }
          break;
        case "ArrowRight":
          if (lastVelocityX !== -1) {
            velocityX = 1;
            velocityY = 0;
          }
          break;
      }
    };
    
    window.addEventListener("keydown", keyDownHandler);
    
    // Game timer
    const gameInterval = setInterval(gameLoop, 1000 / speed);
    
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      clearInterval(gameInterval);
    };
  }, [gameStarted, gameOver]);
  
  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div className="snake-game-container">
      <h1>Snake Game</h1>
      
      <div className="game-area">
        <div className="score-display">Score: {score}</div>
        <canvas 
          ref={canvasRef} 
          width="400" 
          height="400" 
          className="game-canvas"
        />
        
        {!gameStarted && !gameOver && (
          <div className="game-overlay">
            <h2>Snake Game</h2>
            <p>Use arrow keys to control the snake</p>
            <button onClick={resetGame} className="start-button">Start Game</button>
          </div>
        )}
        
        {gameOver && (
          <div className="game-overlay">
            <h2>Game Over!</h2>
            <p>Your score: {score}</p>
            <button onClick={resetGame} className="start-button">Play Again</button>
          </div>
        )}
      </div>
      
      <div className="instructions">
        <h3>How to Play:</h3>
        <ul>
          <li>Use the arrow keys to move the snake</li>
          <li>Eat the red food to grow longer</li>
          <li>Avoid hitting the walls or yourself</li>
          <li>The game gets faster as you eat more food</li>
        </ul>
      </div>

      <div className="mt-6">
        <Link to="/workflow-chart" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Department Workflow Chart
        </Link>
      </div>
    </div>
  );
};

export default Index;