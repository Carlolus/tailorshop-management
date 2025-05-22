<div refs="entity-search@searchView" class="search-results hidden">
    <div class="grid half v-center">
        <h3 class="text-muted px-none">
            <?php echo e(trans('entities.search_results')); ?>

        </h3>
        <div class="text-right">
            <a refs="entity-search@clearButton" class="button outline"><?php echo e(trans('entities.search_clear')); ?></a>
        </div>
    </div>

    <div refs="entity-search@loadingBlock">
        <?php echo $__env->make('common.loading-icon', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </div>
    <div class="book-contents" refs="entity-search@searchResults"></div>
</div><?php /**PATH /var/www/bookstack/resources/views/entities/search-results.blade.php ENDPATH**/ ?>