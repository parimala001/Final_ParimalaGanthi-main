-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2024 at 11:59 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopping_web`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `products` varchar(200) NOT NULL,
  `quantities` int(11) NOT NULL,
  `user` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `products`, `quantities`, `user`) VALUES
(2, 'book2,book4,book6', 5, 'parimala'),
(35, 'book1', 4, 'parimala');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `user` varchar(200) NOT NULL,
  `rating` int(11) NOT NULL,
  `images` varchar(100) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`product_id`, `product_name`, `user`, `rating`, `images`, `text`) VALUES
(1, 'Updated Product 1', 'Jane Doe', 4, 'Array', 'This product could be improved.'),
(2, 'book6', 'user3', 2, '', 'book6 is a children reading book,rated two star'),
(3, 'book9', 'user20', 5, '', 'a good rated book related to fiction'),
(11, 'Product 13', 'user13', 5, 'image1.jpg', 'This is a great product!'),
(12, 'Product 13', 'user13', 5, 'image1.jpg', 'This is a great product!'),
(15, 'Product 13', 'user13', 5, 'image1.jpg', 'This is a great product!');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orders_id` int(11) NOT NULL,
  `record_of_sale` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orders_id`, `record_of_sale`) VALUES
(1, 'Updated record'),
(2, 'order placed and shipped for 4 books'),
(0, 'New record'),
(0, 'New record'),
(0, 'New record'),
(0, 'New record'),
(0, 'New record'),
(0, 'New record'),
(0, 'New record'),
(0, 'New record');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(500) NOT NULL,
  `quantity` int(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `image` varchar(500) NOT NULL,
  `pricing` float NOT NULL,
  `shipping_cost` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `quantity`, `description`, `image`, `pricing`, `shipping_cost`) VALUES
(1, 'Pride And Prejudice', 0, 'A classic of English literature, written with incisive wit and superb character delineation, it centres on the burgeoning relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. ', 'b1.jpg', 5.99, 1.99),
(3, 'Invisible Man', 0, 'Invisible Man is the story of a young, college-educated black man struggling to survive and succeed in a racially divided society that refuses to see him as a human being.', '', 9.99, 2.2),
(6, 'Fahrenheit 451', 0, 'In a future society where books are forbidden, Guy Montag, a “fireman” whose job is the burning of books, takes a book and is seduced by reading. Fahrenheit 451 has been acclaimed for its anti-censorship themes and its defense of literature against the encroachment of electronic media.', 'product6_image.jpg', 13.48, 2.5),
(9, 'Psycho', 0, 'The novel tells the story of Norman Bates, a caretaker at an isolated motel who struggles under his domineering mother and becomes embroiled in a series of murders.', 'product9_image.jpg', 83.48, 2.5),
(10, 'I know Why the Caged Bird Sings', 0, 'I Know Why the Caged Bird Sings, the first of seven autobiographical works by American writer Maya Angelou, published in 1969. The book chronicles her life from age 3 through age 16, recounting an unsettled and sometimes traumatic childhood that included rape and racism.', 'product10.jpg', 19.99, 5.99),
(15, 'Slaughter House-Five', 0, 'an account of Billy Pilgrim\'s capture and incarceration by the Germans during the last years of World War II, and scattered throughout the narrative are episodes from Billy\'s life both before and after the war, and from his travels to the planet Tralfamadore (Trawl-fahm-uh-door).', 'product15.jpg', 15.34, 5.6),
(90, 'A clockwork Orange', 0, 'A Clockwork Orange, novel by Anthony Burgess, published in 1962. Set in a dismal dystopian England, it is the first-person account of a juvenile delinquent who undergoes state-sponsored psychological rehabilitation for his aberrant behaviour.', 'product9_image.jpg', 83.48, 2.5),
(96, 'Song of Solomon', 0, 'In Song of Solomon by Toni Morrison, Milkman demonstrates the growth and change humans are capable of when given the opportunity. Pilate is our moral guide, while Guitar leads Milkman toward a path of self-destruction. Milkman learns that living a shallow purposeless life is meaningless', 'product96_image.jpg', 53.48, 2.5),
(98, 'The White Album', 0, 'he White Album takes us through a maze of American culture and exposes some of the darker sides of the American experience, and of Joan Didion\'s own experiences with health problems and personal tribulations. This book feels extremely personal, like she put to paper her innermost thoughts from this time of her life.', 'product98.jpg', 12.48, 1.5);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(200) NOT NULL,
  `purchase_history` varchar(200) NOT NULL,
  `shipping_adrss` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `username`, `purchase_history`, `shipping_adrss`) VALUES
(0, 'new_user@gmail.com', 'new_password', 'new_username', 'new_purchase_history', ''),
(1, '', '', '', '', ''),
(2, 'xyz@gmail.com', '789', 'user2', '2 items purchased on 9th march', 'albert street,waterloo,ON'),
(0, 'test@example.com', 'test123', 'test_user', 'No previous purchases', '123 Test Street, Test City, Test Country'),
(0, 'test@example.com', 'test123', 'test_user', 'No previous purchases', '123 Test Street, Test City, Test Country'),
(0, 'test@example.com', 'test123', 'test_user', 'No previous purchases', '123 Test Street, Test City, Test Country'),
(0, 'test@example.com', 'test123', 'test_user', 'No previous purchases', '123 Test Street, Test City, Test Country'),
(0, 'gp@gmail.com', '1234', 'parimala ', '', 'brighton street'),
(0, 'lalitha@gmail.com', '234', 'lalitha', '', 'doon'),
(0, 'gp1234@gmail.com', '1234', 'username', '', '157 brighton street,waterloo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD UNIQUE KEY `cart_id` (`cart_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD UNIQUE KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`) USING BTREE;

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
