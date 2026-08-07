---
title: "[Scoop]如何使用Scoop安装软件？"
date: "2026-08-07"
category: "Software"
tags: ["Scoop", "包管理器", "Windows","环境变量","版本控制","安装","命令"]
---

本文将介绍如何使用 scoop 安装软件，以及一些常用命令。  
如果你尚未安装 scoop，请见<a href="post.html?file=posts/scoop_install.md" target="_blank">如何安装Scoop</a>

<h4 id = "04">目录</h4>

<li><a href="#01">安装软件</a></li>
<li><a href="#02">常用命令</a></li>
<li><a href="#03">总结</a></li>

<h2 id="01">安装软件</h2>

<a href = "#04">返回目录</a>

在安装软件之前，你需要了解 `Bucket` 和 `Manifest`。

`Bucket` ：  
当你想安装某个软件，Scoop会更新并查看本地的 **Bucket**，你可以理解为一张**软件清单**，其中收录了各种各样的软件。详情可见[Bucket·ScoopInstaller/Scoop wiki](https://github.com/ScoopInstaller/Scoop/wiki/Buckets) 

`Manifest` ：  
`Manifest` 是一个告诉 Scoop 怎么安装软件的**json文件**，可以理解为一个**配置文件**。其中记录了软件的名称、来源和解压目录等信息。详情可见[App Manifests · ScoopInstaller/Scoop Wiki](https://github.com/ScoopInstaller/Scoop/wiki/App-Manifests) 

如果你想了解更多信息，可见[Home · ScoopInstaller/Scoop Wiki](https://github.com/ScoopInstaller/Scoop/wiki) 

首先，需要使用 scoop 安装版本控制软件 git，打开 PowerShell，输入以下代码：
```PowerShell
scoop install git
```

![#scoop_2](https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEYw9VqddZ_P7ZA_9ggazZEcSwqzu9kygACdCcAAvmbsFeBo40GioJw9D0E.png)

安装 git 的同时会下载 7zip （解压缩软件）。

以后，想安装软件时，可以遵循以下步骤：  

- 打开浏览器并搜索 scoop
- 进入 scoop 官网 [scoop.sh](https://scoop.sh/)
- 搜索软件名称
- 复制指令
- 打开 PowerShell 输入指令
- 等待下载完成

![#scoop_0](https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEYw9NqddZ5wL4CkuOmeij9aBttBqvnzQACcicAAvmbsFdfCNg6qAcl1T0E.png)

![#scoop_1](https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEYw9RqddZ80xAeazfdRntxaEYeD-S6iAACcycAAvmbsFeqn6oXMQEAAcI9BA.png)

<h2 id ="02">常用命令</h2>

<a href = "#04">返回目录</a>

最详细且最准确的信息可以见[Commands · ScoopInstaller/Scoop Wiki](https://github.com/ScoopInstaller/Scoop/wiki/Commands) 

如果想查看所有命令，可以在 PowerShell 中输入 `scoop help` 。

如果想查看某个命令的具体说明，可以输入 `scoop help <命令>` ，例如我想查看 `scoop export` 命令的具体说明，可以输入 `scoop help export` 。

![#scoop_3](https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEYw9ZqddaCflok-SaiZWzrSosj9dVnzgACdScAAvmbsFcnu1UBySqrxj0E.png)

|            命令             | 作用                |
| :-----------------------: | ----------------- |
|   `scoop install <软件名>`   | 安装软件              |
|  `scoop uninstall <软件名>`  | 卸载软件              |
|       `scoop list`        | 查看已安装的软件          |
|    `scoop bucket list`    | 查看已下载的`Bucket`    |
|   `scoop cleanup <软件名>`   | 清理软件的旧版本          |
|      `scoop export`       | 导出一个`json`配置文件    |
| `scoop import <json文件路径>` | 导入配置文件            |
|       `scoop help`        | 查看命令              |
|     `scoop help <命令>`     | 查看指定命令的介绍         |
|    `scoop info <软件名>`     | 查看软件的详细信息         |
|    `scoop reset <软件名>`    | 切换软件版本，可以用来解决软件冲突 |
|   `scoop prefix <软件名>`    | 查看软件的路径           |
|      `scoop update`       | 更新 Scoop 本身       |
|   `scoop update <软件名>`    | 更新某个软件            |
|    `scoop hold <软件名>`     | 禁止某个软件更新          |
|   `scoop unhold <软件名>`    | 使某个软件能够更新         |

查看所有命令，输入 `scoop help` ；查看具体命令，输入 `scoop help <命令>`。

这里演示一次，查看 `scoop help <install>` ：

![#scoop_4 ](https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEYw9dqddaF4upZKQ6dodq89Y7nazNJYQACdicAAvmbsFeSOU42pYtxnT0E.png)

举个例子 `scoop install <软件名> -g` 或者 `scoop install <软件名> --global` 将全局安装指定软件。

<h2 id ="03">总结</h2>

<a href = "#04">返回目录</a>

如何安装软件：  
- 登入 Scoop 官网并搜索软件
- 复制命令
- 打开 PowerShell
- 输入命令并下载

可以使用 `scoop help` 查看所有命令；使用 `scoop help <命令>` 查看指定命令。

我个人使用的 `Bucket` 有 `main`, `extras`, `versions`, `anderlli0053_DEV-tools`, `nonportable` 等。  

我并不推荐使用 Scoop 安装如 Render, Visual Studio, Keil5 MDK等IDE，以及Adobe PhotoShop, AutoCAD等需要购买许可证的软件。  

我推荐安装如 Visual Studio Code, Sublime Text等轻量文本编辑器，以及 `python`, `java`, `node.js`等软件和一些开源软件。