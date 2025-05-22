<div class="form-group entity-selector-container">
    <div component="entity-selector"
         class="entity-selector <?php echo e($selectorSize ?? ''); ?>"
         option:entity-selector:entity-types="<?php echo e($entityTypes ?? 'book,chapter,page'); ?>"
         option:entity-selector:entity-permission="<?php echo e($entityPermission ?? 'view'); ?>">
        <input refs="entity-selector@input" type="hidden" name="<?php echo e($name); ?>" value="">
        <input refs="entity-selector@search entity-selector-popup@searchInput" type="text" placeholder="<?php echo e(trans('common.search')); ?>" <?php if($autofocus ?? false): ?> autofocus <?php endif; ?>>
        <div class="text-center loading" refs="entity-selector@loading"><?php echo $__env->make('common.loading-icon', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?></div>
        <div refs="entity-selector@results"></div>
        <?php if($showAdd ?? false): ?>
            <div class="entity-selector-add">
                <button refs="entity-selector@add" type="button"
                        class="button outline"><?php echo icon('add'); ?><?php echo e(trans('common.add')); ?></button>
            </div>
        <?php endif; ?>
    </div>
</div><?php /**PATH /var/www/bookstack/resources/views/entities/selector.blade.php ENDPATH**/ ?>