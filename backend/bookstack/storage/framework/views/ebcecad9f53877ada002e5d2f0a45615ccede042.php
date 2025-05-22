<div class="image-picker <?php if($errors->has($name)): ?> has-error <?php endif; ?>"
     image-picker="<?php echo e($name); ?>"
     data-default-image="<?php echo e($defaultImage); ?>">

    <div class="grid half">
        <div class="text-center">
            <img <?php if($currentImage && $currentImage !== 'none'): ?> src="<?php echo e($currentImage); ?>" <?php else: ?> src="<?php echo e($defaultImage); ?>" <?php endif; ?>  class="<?php echo e($imageClass); ?> <?php if($currentImage=== 'none'): ?> none <?php endif; ?>" alt="<?php echo e(trans('components.image_preview')); ?>">
        </div>
        <div class="text-center">

            <input type="file" class="custom-file-input" accept="image/*" name="<?php echo e($name); ?>" id="<?php echo e($name); ?>">
            <label for="<?php echo e($name); ?>" class="button outline"><?php echo e(trans('components.image_select_image')); ?></label>
            <input type="hidden" data-reset-input name="<?php echo e($name); ?>_reset" value="true" disabled="disabled">
            <?php if(isset($removeName)): ?>
                <input type="hidden" data-remove-input name="<?php echo e($removeName); ?>" value="<?php echo e($removeValue); ?>" disabled="disabled">
            <?php endif; ?>

            <br>
            <button class="text-button text-muted" data-action="reset-image" type="button"><?php echo e(trans('common.reset')); ?></button>

            <?php if(isset($removeName)): ?>
                <span class="sep">|</span>
                <button class="text-button text-muted" data-action="remove-image" type="button"><?php echo e(trans('common.remove')); ?></button>
            <?php endif; ?>
        </div>
    </div>

    <?php if($errors->has($name)): ?>
        <div class="text-neg text-small"><?php echo e($errors->first($name)); ?></div>
    <?php endif; ?>

</div><?php /**PATH /var/www/bookstack/resources/views/form/image-picker.blade.php ENDPATH**/ ?>