
<div class="mb-xl">
    <form refs="entity-search@searchForm" class="search-box flexible" role="search">
        <input refs="entity-search@searchInput" type="text"
               aria-label="<?php echo e($label); ?>" name="term" placeholder="<?php echo e($label); ?>">
        <button type="submit" aria-label="<?php echo e(trans('common.search')); ?>"><?php echo icon('search'); ?></button>
    </form>
</div><?php /**PATH /var/www/bookstack/resources/views/entities/search-form.blade.php ENDPATH**/ ?>