package in.sanjeetdutt.linkList;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LRUCacheTest {

    @Test
    void test1(){
        LRUCache lruCache = new LRUCache(2);
        lruCache.set(1,10);
        lruCache.set(5,12);
        assertEquals(lruCache.get(5),12);
        assertEquals(lruCache.get(1),10);
        lruCache.set(6,14);
        assertEquals(lruCache.get(5),-1);
    }

}
