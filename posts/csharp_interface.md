---
title: "[C#]什么是接口？"
date: "2026-08-11"
category: "C#"
tags: ["C#", "接口"]
---

本文将介绍 C# 中的接口。

## 目录

<li><a href="#01">C#中的接口</a></li>
<li><a href="#02">C#接口语法介绍</a></li>
<li><a href="#03">总结</a></li>

---

<h2 id = "01">C#中的接口</h2>

C# 中，可以使用 `interface` 关键字定义接口。接口实际上是一种**抽象集**。我之所以使用“抽象集”这个词描述接口，是因为接口的作用就是**约定一些抽象的性质和行为**。  
假设我正在写一本小说，我在为小说人物写设定。我平常喜欢看特摄作品，诸如《假面骑士空我》、《假面骑士亚极陀》、《假面骑士创骑》和《假面骑士Ex-aid》等，假面骑士中有一个设定——敌我同源[^1] 。我想把敌我同源的设定用在小说人物里，在此之前我先剖析一下《假面骑士Ex-aid》的设定。  
在这部作品当中，敌人是 **游戏病病毒** ，**镜飞彩（天才外科医生）**、**九条贵利矢（法医）** 和 **檀黎斗（创梦社长）** 都能够变身成假面骑士是因为他们接受了适能者手术。游戏病病毒的力量来自创梦集团的游戏卡带，假面骑士们的力量也来自游戏卡带——力量来源是游戏卡带。  
在《假面骑士创骑》中，敌人是吸收了星云气体而变成怪人的人类，假面骑士是吸收了星云气体仍能保持理智的人类，并使用**满装瓶**变身，与怪人作战。——力量来源是星云气体。  
我介绍了这两部特摄作品中的设定，怪人和假面骑士的力量来源均来自同一事物。如果我想把敌我同源的设定运用在我的小说中，应该如何做呢？我会这样做：  
1. **确定力量来源的设定**，比如这股力量的来源是一块石头，石头有形状、大小和颜色，可以释放力量包裹全身。
2. **接下来确定主角的力量设定**，比如主角使用力量和怪人使用力量是不同的方式，主角需要把石头放在特制的抑制容器中才能变身，以防止暴走。主角的石头的形状均为三角形，颜色为绿色。主角能够利用力量发射光线。
3. **再确定怪人的力量设定**，比如怪人需要吞下石头才能获得力量，而且每次都会暴走。怪人的石头的形状为圆形，颜色为红色。不同的怪人能够利用力量使出不同的技能。
4. **在写的过程中新增各种各样的怪人力量设定**，比如量产版怪人，吞下的石头都是灰色的，使用的技能都是相同的。

我第一步做的事情是**确定力量来源的设定**，其实我就是**提前**约定好力量的本质，但是我不**具象化**它，因为不同的人的**力量来源的性质**和**使用力量的方式**也不同，所以我先**抽象化**出一些相同的性质，我上面举的例子中提到的石头是力量来源，性质有形状、大小和颜色，行为是使用石头时会释放出力量包裹全身。对于主角和怪人，我是后面再逐渐**具象化**并**拓展**的。  

接口也是同理，接口是**提前**约定好一些成员，但是只是**抽象化**，**暂时不实现（具象化）**。后面使用类继承该接口再**实现**其中的成员。  

似乎无关的东西写的多了，但是毕竟在我脑子里浮现出来了，写下来也顺理成章……

---

<h2 id = "02">C#接口语法介绍</h2>

接下来正式介绍接口的语法，包括定义接口、实现接口等语法，请读者看完一部分内容就及时动手体会一下。

点击这里可以在官方文档中查看接口的介绍[Interfaces - define behavior for multiple types - C# | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/interfaces) 

<h3>定义</h3>

C#中定义接口使用 `interface` 关键字，`interface <接口名>` 。接口名前应该加一个 `I` 来标识这是个接口。接口中可以声明**属性、方法、索引器和事件**，但是不能声明**字段、构造函数和析构函数**。从继承这个概念角度出发，`interface` 实际上解决了 `class` 不能同时继承多个 `class`  的问题。例如，我定义了三个类 `class Person`, `class Father`, `class Mother`。`Person` 不能同时继承 `Father` 和 `Mother`，只能从中选一个继承。但是 `class` 可以继承多个 `interface` 。定义了两个接口 `interface IFather`, `interface IMother`，`Person` 可以同时继承这两个接口 `IFather`, `IMother`。

```csharp
interface IPowerSource
{
	string shape; //编译器会报错
	int size; //编译器会报错
	string color; //编译器会报错
}
```

声明成员字段时，Visual Studio 中编译器报错“接口不能包含实例字段“，

```csharp
interface IPowerSource
{
	string Shape{get;set;}//自动属性的写法
	int Size{get;set;}
	string Color{get;set;}
}
```

接口中可以声明属性，其中 `Shape` , `Size` , `Color` 为成员属性。分别表示 `形状`，`尺寸`，`颜色`。

```csharp
interface IPowerSource
{
	public string Shape{get;set;}
	public int Size{get;set;}
	public string Color{get;set;}
	
	protected void ReleasePower();
	public void PrintName();
}
```

接口的成员默认访问类型是 `public` ，可以修改，如 `ReleasePower()` 修改为了 `protected`，当然也可以修改为 `internal`。但是，**唯独不能修改为`private`**，原因很简单——接口需要被实现，如果某成员访问类型是 `private` ，那接口里定义的该成员不能被实现，也就没有意义。  
接口的成员方法不能有方法体。

---

<h3>实现</h3>

<h4>隐式实现</h4>

类继承接口时需要实现接口中声明的成员。类继承接口应这样写 `class <类名> : <接口名>` 。如果继承多个接口时，应用逗号分隔开接口， `class <类名> : <接口名> , <接口名> , ..., <接口名>`   
继承接口的类需要实现该接口的所有成员。

```csharp
class Person : IPowerSource
{
    public string Shape { get; set; } = "三角形"; //为属性赋默认值
    public int Size { get; set; } = 10;
    public string Color { get; set; } = "绿色";

    public void ReleasePower()
    {
    }
    public void Print()
    {
        Console.WriteLine($"形状：{Shape}；尺寸：{Size}；颜色：{Color}");
    }
}
```

`Person` 类**隐式**实现了接口 `IPowerSource` 。

```csharp
internal class Program
{
    static void Main(string[] args)
    {
        Person person = new Person(); //实例化
        IPowerSource person2 = new Person(); //根据里氏替换原则，任何父类出现的地方都能使用子类替代

        person.Print(); //输出：“形状：三角形；尺寸：10；颜色：绿色”
        person2.Print(); ////输出：“形状：三角形；尺寸：10；颜色：绿色”
    }
}
```

实例化了两个对象，并调用它们的`Print()`方法。根据里氏替换原则，任何父类出现的地方都能使用子类替代，描述的是子类可以在父类的基础上“做加法”，但是不能“做减法”。

<h4>显示实现</h4>

显示实现时，需要在成员前加上接口名称和访问修饰符 '.' 。  
什么时候会想显示实现？——当你有两个接口，两个接口中有同名方法时，实现的同名方法内容不一样，例如：

```csharp
public interface IControl
{
    void Paint();
}
public interface ISurface
{
    void Paint();
}
public class SampleClass : IControl, ISurface
{
	//隐式实现
    public void Paint()
    {
        Console.WriteLine("Paint method in SampleClass");
    }
}
```

```csharp
internal class Program
{
    static void Main(string[] args)
    {
        SampleClass t1 = new SampleClass();
        IControl t2 = new SampleClass();
        ISurface t3 = new SampleClass();

        t1.Paint(); //输出"Paint method in SampleClass"
        t2.Paint(); //输出"Paint method in SampleClass"
        t3.Paint(); //输出"Paint method in SampleClass"
    }
}
```

```csharp
public class SampleClass : IControl, ISurface
{
	//显示实现
    void IControl.Paint()
    {
        System.Console.WriteLine("IControl.Paint");
    }
    //显示实现
    void ISurface.Paint()
    {
        System.Console.WriteLine("ISurface.Paint");
    }
}
```

```csharp
internal class Program
{
    static void Main(string[] args)
    {
        SampleClass t1 = new SampleClass();
        IControl t2 = new SampleClass();
        ISurface t3 = new SampleClass();

        t1.Paint(); //编译错误，因为SampleClass中没有定义Paint()方法
        t2.Paint(); //输出"IControl.Paint"
        t3.Paint(); //输出"ISurface.Paint"
    }
}
```

可见，如果显示实现，那么只有使用接口类型的对象才能使用各自的 `Paint()` 方法。  
`IControl` 类型的 `t2` 对象才能使用 `IControl.Paint()`；`ISurface` 类型的 `t3` 对象才能使用 `ISurface.Paint()`。   
如果我想让 `SampleClass` 类型的 `t1` 对象也能够使用 `Paint()` 方法，那么需要在 `SampleClass` 中定义：

```csharp
public void Paint()
{
	Console.WriteLine("SampleClass.Paint");
}
```

---

<h2 id = "03">总结</h2>

接口是用来约定一些抽象的性质和行为的。  
使用 `interface` 关键字声明接口。  
类只能有一个父类，但是能继承多个接口。  
接口的成员可以是属性、事件、索引器和方法，不能是字段、构造函数和析构函数。  
接口的成员不能是 `private` 的。  
接口的成员方法不能有方法体。  
根据里氏替换原则，任何父类出现的地方都可以使用子类来替代。任何接口出现的地方都可以使用继承该接口的类来替代。   
接口的隐式实现和显式实现区别在于**调用者**是谁。


[^1]: 敌我同源，指的是假面骑士实际上和怪人的力量是同一性质的，只是假面骑士希望用力量守护人们，所以被称为假面骑士。