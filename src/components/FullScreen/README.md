```javascript
export default () => {
  const [isFull, setIsFull] = React.useState(false);

  const handleClick = () => {
    setIsFull(!isFull);
  };

  const handleCloseFullscreen = () => {
    setIsFull(false);
  };

  return (
    <FullScreen enabled={isFull} onClose={handleCloseFullscreen}>
      <div style={{ background: '#fff', height: '100%', width: '100%' }}>
        <button onClick={handleClick}>全屏</button>
      </div>
    </FullScreen>
  );
};
```

### 全屏整个页面
```javascript
export default () => {
  const [isFull, setIsFull] = React.useState(false);

  const handleClick = () => {
    setIsFull(!isFull);
  };

  const handleCloseFullscreen = () => {
    setIsFull(false);
  };

  return (
    <div>
      <FullScreen
        enabled={isFull}
        target={document.documentElement}
        onClose={handleCloseFullscreen}
      />
      <button onClick={handleClick}>全屏</button>
    </div>
  );
};
```