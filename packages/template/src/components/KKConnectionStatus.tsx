'use client';

import { Button, Text, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { KeepKeyUiGlyph } from './logo/keepkey-ui-glyph';
import { FaCircle } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';

export interface KKConnectionStatusProps {
  /**
   * Size of the indicator
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
}

export function KKConnectionStatus({ 
  size = 'md'
}: KKConnectionStatusProps) {
  const [isConnected, setIsConnected] = useState(false);
  
  // Demo connection toggle - replace with actual connection logic
  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };
  
  const sizesMap = {
    sm: { icon: '16px', fontSize: 'xs' },
    md: { icon: '20px', fontSize: 'sm' },
    lg: { icon: '24px', fontSize: 'md' },
  };
  
  return (
    <Button
      variant="outline"
      bg="gray.800"
      color="white"
      borderColor="gray.600"
      size={size}
      p={2}
      onClick={toggleConnection}
    >
      <Flex alignItems="center">
        <KeepKeyUiGlyph 
          height={sizesMap[size].icon} 
          width={sizesMap[size].icon}
          color="currentColor"
          mr={2}
        />
        <Text fontSize={sizesMap[size].fontSize} mr={2}>
          {isConnected ? "Connected" : "Connect"}
        </Text>
        <Icon 
          as={FaCircle} 
          color={isConnected ? "green.500" : "red.500"} 
          boxSize="8px"
        />
      </Flex>
    </Button>
  );
} 