---
title: "[Scoop]如何安装Windows包管理器Scoop？"
date: "2026-08-05"
category: "Software"
tags: ["Scoop", "包管理器", "Windows","环境变量","版本控制","安装"]
---

**Scoop** ，**Windows** 平台的命令行包管理器。  
本文将一步一步带你安装包管理器 **Scoop**。  

## 官方地址

Scoop 官网：  
[Scoop](https://scoop.sh/)

Scoop 仓库页面：  
[ScoopInstaller/Install: 📥 Next-generation Scoop (un)installer](https://github.com/ScoopInstaller/Install) 

---

## 安装前须知

1. **PowerShell** 最新版本或者 5.1版本。
2. **PowerShell** `Language Mode` 需要设置为 `FullLanguage` ，一般地，默认模式均为 `FullLanguage` 。关于 `Language Mode` ，可以见微软官方文档[about_Language_Modes - PowerShell |Microsoft Learn](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_language_modes?view=powershell-7.6) 
3. **PowerShell**  `Execution Policy` 需要选择以下其中一个：  
	- `RemoteSigned`
	- `Unrestricted` 
	- `ByPass` 
	一般地，Windows 电脑的默认执行策略是 `RemoteSigned` 。关于 `Execution Policy` ，可见[about_Execution_Policies - PowerShell |Microsoft Learn](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.6#managing-the-execution-policy-with-powershell) 

---

## 安装步骤

如果你想选择安装到自定义目录，请见[自定义安装步骤](#自定义目录安装步骤) 。

打开 PowerShell，

![](images/img_dir/scoop_install/打开PowerShell.png)


执行以下代码，以在指定范围 `CurrentUser` 内，设置执行策略为 `RemoteSigned`：
```PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

执行以下代码，安装 Scoop ：
```PowerShell
irm get.scoop.sh | iex
```

![](images/img_dir/scoop_install/安装scoop.png) 

`irm` 是 `Invoke-RestMethod` ，作用是将 HTTP 或 HTTPS 请求发送到 RESTful Web 服务。  
`iex` 是 `Invoke-Expression` ，作用是在本地计算机上运行命令或表达式。

安装完毕后，输入以下代码，查看 Scoop 版本，验证 Scoop 是否安装成功：
```PowerShell
scoop --version
```

![](images/img_dir/scoop_install/查看scoop版本.png)

你创建的 Scoop 文件夹在 `C:\Users\你的用户名` 处。关于如何用 Scoop 安装软件，可见[如何使用Scoop安装软件](如何使用scoop安装软件.md) 

---

## 自定义目录安装步骤

打开 PowerShell，  

![](images/img_dir/scoop_install/打开PowerShell.png) 

打开资源管理器，创建文件目录并复制路径，  

![](images/img_dir/scoop_install/创建文件夹.png)

![](images/img_dir/scoop_install/复制路径.png)

输入以下代码，进入你指定的文件目录：
```PowerShell
cd <文件路径>
```

![](images/img_dir/scoop_install/跳转目标路径.png)

执行以下代码，以在指定范围 `CurrentUser` 内，设置执行策略为 `RemoteSigned`：
```PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

打开 PowerShell ，输入以下代码，以获得 `install.ps1` 文件：
```PowerShell
irm get.scoop.sh -outfile 'install.ps1'
```

你可以在你的文件夹中找到该文件 `install.ps1` ，

![](images/img_dir/scoop_install/获取的文件.png)

> 另一种获取 `install.ps1` 文件的方法：访问 [ScoopInstaller/Install: 📥 Next-generation Scoop (un)installer](https://github.com/ScoopInstaller/Install) 以下载 `install.ps1` 文件。

如果你想知道可以调整哪些自定义安装参数，可以输入以下代码：  
```PowerShell
.\install.ps1 -?
```

> 你也可以访问 [ScoopInstaller/Install: 📥 Next-generation Scoop (un)installer](https://github.com/ScoopInstaller/Install) ，查看 `install.ps1` 文件的源代码

这里仅介绍两个参数：
```
.PARAMETER ScoopDir
    Specifies Scoop root path.
    If not specified, Scoop will be installed to '$env:USERPROFILE\scoop'.
.PARAMETER ScoopGlobalDir
    Specifies directory to store global apps.
    If not specified, global apps will be installed to '$env:ProgramData\scoop'.
```

`ScoopDir` 用于设置 Scoop 根目录，如果留空，Scoop 将安装到默认目录 `$env:USERPROFILE\scoop` ，即 `C:\Users\你的用户名` 。  
`ScoopGlobalDir` 用于设置 Scoop **全局应用**目录，如果留空，全局应用将被安装到 `$env:ProgramData\scoop` 中，即 `C:\ProgramData\scoop` 中。

如果想安装到指定目录，请输入以下代码：
```PowerShell
.\install.ps1 -ScoopDir <自定义目录> -ScoopGlobalDir <自定义目录> 
```

> 自定义目录路径应用单引号括起来，并填写绝对路径，例如 `'D:\Applications\Scoop'` 。

先创建好指定文件夹 `Scoop` 和 `ScoopGlobal` ，文件夹名字可以自定义。

![](images/img_dir/scoop_install/创建Scoop目录.png)

假如我想安装到 `C:\Scoop\Scoop`中，全局应用安装到 `C:\Scoop\ScoopGlobal` 中，可以输入：  
```PowerShell
.\install.ps1 -ScoopDir 'C:\Scoop\Scoop' -ScoopGlobalDir 'C:\Scoop\ScoopGlobal'
```

![](images/img_dir/scoop_install/成功安装.png)


## 总结

普通安装方式不用多说，主要是**自定义安装方式**，官方仓库提供的 `install.ps1` 文件能够提便捷的安装方式。  
这里提及一下为什么用 Scoop 包管理器。因为当想编写 `python`、`node.js`等等脚本时，需要**手动配置**环境变量，如果有 Scoop 包管理器，你只需要进行 `scoop install <软件名>` 即可快速安装，Scoop 帮你自动配置环境变量。而且 Scoop 管理软件也能起到隔离作用。