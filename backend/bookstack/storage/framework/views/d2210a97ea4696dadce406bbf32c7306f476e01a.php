
<table component="add-remove-rows"
       option:add-remove-rows:remove-selector="button.text-neg"
       option:add-remove-rows:row-selector="tr"
       class="no-style">
    <?php $__currentLoopData = array_merge($currentList, ['']); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $term): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <tr <?php if(empty($term)): ?> class="hidden" refs="add-remove-rows@model" <?php endif; ?>>
            <td class="pb-s pr-m">
                <input class="exact-input outline" type="text" name="<?php echo e($type); ?>[]" value="<?php echo e($term); ?>">
            </td>
            <td>
                <button type="button" class="text-neg text-button"><?php echo icon('close'); ?></button>
            </td>
        </tr>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    <tr>
        <td colspan="2">
            <button refs="add-remove-rows@add" type="button" class="text-button">
                <?php echo icon('add-circle'); ?><?php echo e(trans('common.add')); ?>

            </button>
        </td>
    </tr>
</table><?php /**PATH /var/www/bookstack/resources/views/search/parts/term-list.blade.php ENDPATH**/ ?>