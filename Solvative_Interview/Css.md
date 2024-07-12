## The CSS Box Model

In CSS, the term "box model" is used when talking about design and layout.

The CSS box model is essentially a box that wraps around every HTML element. It consists of: content, padding, borders and margins. The image below illustrates the box model:
![[Pasted image 20240709151342.png]]
Explanation of the different parts:

- **Content** - The content of the box, where text and images appear
- **Padding** - Clears an area around the content. The padding is transparent
- **Border** - A border that goes around the padding and content
- **Margin** - Clears an area outside the border. The margin is transparent

The box model allows us to add a border around elements, and to define space between elements.


## What is the difference between Display: none and visibility: hidden



## Gave an HTML structure and asked him to align child elements vertically in mobile and align side by side in resolutions above 768px using mobile first approach

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <title>Browser</title>
</head>

<body>
  <div>
    <div>Child 1</div>
    <div>Child 2</div>
  </div>
</body>

</html>
```

```css

```


- doctype html use 
- display none and visibility hidden
- pseudo elements and classes
- VH/VW (viewport height/ viewport width)
- z-index

- What is a CSS keyframe
	- A CSS keyframe is a stage in an animation sequence. They specify styles at specific times during an animation
- Difference between 
	- Animation delay and transition delay
	- animation duration and transition duration