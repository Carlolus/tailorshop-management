<div class="dropdown-search" components="dropdown dropdown-search"
     option:dropdown-search:url="/search/entity/siblings?entity_type=<?php echo e($entity->getType()); ?>&entity_id=<?php echo e($entity->id); ?>"
     option:dropdown-search:local-search-selector=".entity-list-item"
>
    <div class="dropdown-search-toggle" refs="dropdown@toggle"
         aria-haspopup="true" aria-expanded="false" tabindex="0">
        <div class="separator"><?php echo icon('chevron-right'); ?></div>
    </div>
    <div refs="dropdown@menu" class="dropdown-search-dropdown card" role="menu">
        <div class="dropdown-search-search">
            <?php echo icon('search'); ?>
            <input refs="dropdown-search@searchInput"
                   aria-label="<?php echo e(trans('common.search')); ?>"
                   autocomplete="off"
                   placeholder="<?php echo e(trans('common.search')); ?>"
                   type="text">
        </div>
        <div refs="dropdown-search@loading">
            <?php echo $__env->make('common.loading-icon', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        </div>
        <div refs="dropdown-search@listContainer" class="dropdown-search-list px-m"></div>
    </div>
</div><?php /**PATH /var/www/bookstack/resources/views/entities/breadcrumb-listing.blade.php ENDPATH**/ ?>