-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2016-11-28 00:02:25
-- 服务器版本： 5.7.16-0ubuntu0.16.04.1
-- PHP Version: 7.0.8-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coditor`
--

-- --------------------------------------------------------

--
-- 表的结构 `myCode`
--

CREATE TABLE `myCode` (
  `codeId` int(11) NOT NULL,
  `codeText` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `myCode`
--

INSERT INTO `myCode` (`codeId`, `codeText`) VALUES
(1, 'Hello World!');

-- --------------------------------------------------------

--
-- 表的结构 `myProj`
--

CREATE TABLE `myProj` (
  `title` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `lastEdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `htmlId` int(11) NOT NULL,
  `cssId` int(11) NOT NULL,
  `jsId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `myUser`
--

CREATE TABLE `myUser` (
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `psw` char(50) NOT NULL,
  `regTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `myUser`
--

INSERT INTO `myUser` (`username`, `email`, `psw`, `regTime`) VALUES
('Hao', 'mehaoyellow@gmail.com', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', '2016-11-25 16:51:06'),
('Haoo', 'me@foo.com', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', '2016-11-25 16:53:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `myCode`
--
ALTER TABLE `myCode`
  ADD PRIMARY KEY (`codeId`);

--
-- Indexes for table `myProj`
--
ALTER TABLE `myProj`
  ADD PRIMARY KEY (`title`,`username`);

--
-- Indexes for table `myUser`
--
ALTER TABLE `myUser`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `myCode`
--
ALTER TABLE `myCode`
  MODIFY `codeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
