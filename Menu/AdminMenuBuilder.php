<?php
/**
 * Created by PhpStorm.
 * User: miky
 * Date: 17/04/17
 * Time: 17:29
 */

namespace Miky\Bundle\AdminBundle\Menu;


use Knp\Menu\ItemInterface;
use Miky\Bundle\MenuBundle\Builder\AbstractMenuBuilder;
use Miky\Bundle\MenuBundle\Event\MenuBuilderEvent;

final class AdminMenuBuilder extends AbstractMenuBuilder
{
    const EVENT_NAME = 'miky.menu.admin.main';

    /**
     * @return ItemInterface
     */
    public function createMenu()
    {
        $menu = $this->factory->createItem('root');

        $this->eventDispatcher->dispatch(self::EVENT_NAME, new MenuBuilderEvent($this->factory, $menu));

        return $menu;
    }
}
